import { inngest } from "./client";
import { sendEmailToMehul } from "../email";
import { updateViewsCount } from "../db-helper";

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
    await step.run("update-views", async () => {
      const updatedCount = await updateViewsCount();
      return updatedCount;
    });
    return { success: true, message: "Views count updated successfully" };
  }
);
