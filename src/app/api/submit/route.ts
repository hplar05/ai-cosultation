
import { NextRequest, NextResponse } from 'next/server';


const N8N_WEBHOOK_URL = "https://hplar.app.n8n.cloud/webhook/6adbab4c-5992-4680-bcba-4437b533a216";

export async function POST(req: NextRequest) {
  try {
   
    const formData = await req.json();

   
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     
      },
      body: JSON.stringify(formData),
  
      cache: 'no-store', 
    });

    if (!n8nResponse.ok) {
      console.error(`n8n webhook failed with status: ${n8nResponse.status}`);
      const errorText = await n8nResponse.text();
      return NextResponse.json(
        { message: "Failed to submit data to n8n webhook", details: errorText }, 
        { status: n8nResponse.status }
      );
    }
    
  
    return NextResponse.json({ message: "Form submitted successfully via proxy" }, { status: 200 });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}