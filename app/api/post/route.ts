import { NextResponse } from "next/server";
import { inngest } from "@/lib/backend/inngest/client";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fire and forget Inngest event for email processing
    await inngest.send({
      name: "app/email.send",
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, message: "Email queued" });
  } catch (error) {
    console.error("Error in /api/post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
