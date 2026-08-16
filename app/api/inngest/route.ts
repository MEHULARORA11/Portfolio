import { serve } from "inngest/next";
import { inngest } from "@/lib/backend/inngest/client";
import { sendEmail, incrementViews } from "@/lib/backend/inngest/functions";

// Create an API that serves zero-downtime background jobs
export const { GET, POST, PUT } = serve({ // as GET so that inngest can get the number of functions available
  client: inngest, // POST => triggers when a function is triggered , and PUT to keep the app and inngest server in sync 
  functions: [ // note this set of code should be necessarily be configured in /api/inngest , for other route we need to change the configuration namely , sevePath after functions in this functions
    sendEmail,
    incrementViews,
  ],
});


/**
 * The Big Picture Architecture
Unlike traditional background queues (like BullMQ or Celery) where your server actively "pulls" jobs from a Redis queue, Inngest is a push-based system.

When you trigger an event somewhere else in your code (e.g., inngest.send({ name: "app/user.signup" })), the Inngest cloud receives that event, looks up which function listens to it, and then makes an HTTP POST request right back to this API route to execute the job.
 */