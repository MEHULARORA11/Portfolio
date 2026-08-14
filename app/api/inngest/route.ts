import { serve } from "inngest/next";
import { inngest } from "@/lib/backend/inngest/client";
import { sendEmail, incrementViews } from "@/lib/backend/inngest/functions";

// Create an API that serves zero-downtime background jobs
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendEmail,
    incrementViews,
  ],
});
