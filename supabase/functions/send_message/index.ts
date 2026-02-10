import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface MessageRequest {
  consultation_id: string;
  message: string;
  attachment_url?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: authHeader,
        apikey: supabaseKey,
      },
    });

    if (!verifyResponse.ok) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = await verifyResponse.json();
    const userId = user.id;

    const { consultation_id, message, attachment_url }: MessageRequest = await req.json();

    if (!consultation_id || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const consultationResponse = await fetch(
      `${supabaseUrl}/rest/v1/consultations?id=eq.${consultation_id}&select=doctor_id,patient_id`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      }
    );

    if (!consultationResponse.ok || (await consultationResponse.json()).length === 0) {
      return new Response(JSON.stringify({ error: "Consultation not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const consultationData = await consultationResponse.json();
    const consultation = consultationData[0];

    const doctorResponse = await fetch(
      `${supabaseUrl}/rest/v1/doctors?id=eq.${consultation.doctor_id}&select=user_id`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      }
    );

    let senderType = "patient";
    if (doctorResponse.ok) {
      const doctors = await doctorResponse.json();
      if (doctors.length > 0 && doctors[0].user_id === userId) {
        senderType = "doctor";
      }
    }

    const messageResponse = await fetch(`${supabaseUrl}/rest/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        consultation_id,
        sender_id: userId,
        sender_type: senderType,
        message,
        attachment_url: attachment_url || null,
      }),
    });

    if (!messageResponse.ok) {
      const error = await messageResponse.json();
      return new Response(JSON.stringify({ error: error.message || "Failed to send message" }), {
        status: messageResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messageData = await messageResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: messageData[0],
      }),
      {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
