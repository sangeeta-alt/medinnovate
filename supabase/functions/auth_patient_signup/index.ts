import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PatientSignupRequest {
  email: string;
  password: string;
  full_name: string;
  age?: number;
  location?: string;
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

    const { email, password, full_name, age, location }: PatientSignupRequest = await req.json();

    if (!email || !password || !full_name) {
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

    const patientResponse = await fetch(`${supabaseUrl}/rest/v1/patients`, {
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
        age: age || null,
        location: location || null,
      }),
    });

    if (!patientResponse.ok) {
      const error = await patientResponse.json();
      return new Response(JSON.stringify({ error: error.message || "Failed to create patient profile" }), {
        status: patientResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const patient = await patientResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        user: authData.user,
        patient: patient[0],
        message: "Patient account created successfully.",
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
