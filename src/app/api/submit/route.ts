// app/api/submit-consultation/route.ts

import { NextRequest, NextResponse } from 'next/server';

// The URL of your external n8n webhook
const N8N_WEBHOOK_URL = "https://slimy-dog-77.hooks.n8n.cloud/webhook-test/c5ac6a61-99ac-41fa-86bd-06dcc2b7ee69";

export async function POST(req: NextRequest) {
  try {
    // 1. Get the JSON body from the incoming request (from the client)
    const formData = await req.json();

    // 2. Make the server-to-server call to the n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No need for CORS headers here, it's server-to-server
      },
      body: JSON.stringify(formData),
      // Set to 'no-store' to ensure fresh request every time
      cache: 'no-store', 
    });

    // 3. Handle potential errors from the n8n webhook itself
    if (!n8nResponse.ok) {
      console.error(`n8n webhook failed with status: ${n8nResponse.status}`);
      const errorText = await n8nResponse.text();
      return NextResponse.json(
        { message: "Failed to submit data to n8n webhook", details: errorText }, 
        { status: n8nResponse.status }
      );
    }
    
    // 4. Return success response to the client
    // We can forward the response from n8n or just return a simple success status.
    // Assuming n8n returns a response you want to ignore, we return 200.
    return NextResponse.json({ message: "Form submitted successfully via proxy" }, { status: 200 });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}