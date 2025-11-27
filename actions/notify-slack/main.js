import * as core from "@actions/core";

const message = core.getInput("message", { required: true });
const messageType = core.getInput("type", { required: false });
const webhookUrl = core.getInput("webhook-url", { required: true });

// const message = process.env.INPUT_MESSAGE

(async () => {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attachments: [{ text: message, color: messageType }],
    }),
  });

  if (!res.ok) {
    console.error(`Slack API responded with ${res.status}`);
    process.exit(1);
  }

  console.log("Message sent succesfully ✅");
  process.exit(0);
})();
