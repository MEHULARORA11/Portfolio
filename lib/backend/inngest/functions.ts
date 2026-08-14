import { inngest } from "./client";
import { sendEmailToMehul } from "../email";
import { updateViewsCount, syncRedis } from "../db-helper";

export const sendEmail = inngest.createFunction(
  {
    id: "send-email-to-mehul",
    triggers: [{ event: "app/email.send" }],
    retries: 5,
    concurrency: {
      limit: 2,
    },
    throttle: {
      limit: 10,
      period: "1m",
    },
  },
  async ({ event, step }) => {
    const { name, email, message } = event.data;

    await step.run("send-email", async () => {
      await sendEmailToMehul(name, email, message);
    });

    return { success: true, message: "Email sent successfully" };
  }
);

export const incrementViews = inngest.createFunction(
  {
    id: "update-views-count",
    triggers: [{ event: "app/views.update" }],
    retries: 3,
    concurrency: {
      limit: 2,
    },
    throttle: {
      limit: 5,
      period: "1m",
    },
  },
  async ({ event, step }) => {
    // Step 1 — persist the increment to Postgres (source of truth)
    const updatedCount = await step.run("update-views-in-db", async () => {
      return await updateViewsCount();
    });

    // Step 2 — overwrite Redis with the authoritative DB count so they
    //           never drift apart (runs only after Step 1 succeeds)
    await step.run("sync-redis-from-db", async () => {
      return await syncRedis();
    });

    return {
      success: true,
      message: "Views count updated and Redis synced",
      newCount: updatedCount,
    };
  }
);
