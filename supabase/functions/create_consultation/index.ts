import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ConsultationRequest {
  symptoms_description: string;
  specialty?: string;
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

    const token = authHeader.substring(7);
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

    const { symptoms_description, specialty }: ConsultationRequest = await req.json();

    if (!symptoms_description) {
      return new Response(
        JSON.stringify({ error: "Symptoms description required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const patientResponse = await fetch(
      `${supabaseUrl}/rest/v1/patients?user_id=eq.${userId}&select=id`,
      {
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          apikey: serviceKey,
        },
      }
    );

    if (!patientResponse.ok) {
      return new Response(JSON.stringify({ error: "Patient profile not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const patients = await patientResponse.json();
    if (patients.length === 0) {
      return new Response(JSON.stringify({ error: "Patient profile not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const patientId = patients[0].id;

    const consultationResponse = await fetch(`${supabaseUrl}/rest/v1/consultations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        patient_id: patientId,
        symptoms_description,
        status: "pending",
      }),
    });

    if (!consultationResponse.ok) {
      const error = await consultationResponse.json();
      return new Response(JSON.stringify({ error: error.message || "Failed to create consultation" }), {
        status: consultationResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const consultation = await consultationResponse.json();

    const availableDoctorsQuery = specialty
      ? `?verified=eq.true&is_available=eq.true&specialty=eq.${encodeURIComponent(specialty)}&limit=1`
      : `?verified=eq.true&is_available=eq.true&limit=1`;

    const doctorsResponse = await fetch(`${supabaseUrl}/rest/v1/doctors${availableDoctorsQuery}`, {
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
    });

    if (doctorsResponse.ok) {
      const doctors = await doctorsResponse.json();
      if (doctors.length > 0) {
        const doctorId = doctors[0].id;

        await fetch(`${supabaseUrl}/rest/v1/notifications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
          },
          body: JSON.stringify({
            doctor_id: doctorId,
            consultation_id: consultation[0].id,
            title: "New Consultation Request",
            body: `Patient seeking help for: ${symptoms_description.substring(0, 50)}...`,
          }),
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        consultation: consultation[0],
        message: "Consultation request created. Doctors are being notified.",
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
