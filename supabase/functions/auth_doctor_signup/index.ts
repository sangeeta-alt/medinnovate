import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface DoctorSignupRequest {
  email: string;
  password: string;
  full_name: string;
  license_number: string;
  specialty: string;
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

    const { email, password, full_name, license_number, specialty }: DoctorSignupRequest = await req.json();

    if (!email || !password || !full_name || !license_number || !specialty) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const authResponse = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
      },
      body: JSON.stringify({
        email,
        password,
        user_metadata: {
          full_name,
        },
      }),
    });

    if (!authResponse.ok) {
      const error = await authResponse.json();
      return new Response(JSON.stringify({ error: error.message || "Signup failed" }), {
        status: authResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authData = await authResponse.json();
    const userId = authData.user.id;

    const doctorResponse = await fetch(`${supabaseUrl}/rest/v1/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        user_id: userId,
        full_name,
        license_number,
        specialty,
        verified: false,
      }),
    });

    if (!doctorResponse.ok) {
      const error = await doctorResponse.json();
      return new Response(JSON.stringify({ error: error.message || "Failed to create doctor profile" }), {
        status: doctorResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const doctor = await doctorResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        user: authData.user,
        doctor: doctor[0],
        message: "Doctor account created. Pending verification.",
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
