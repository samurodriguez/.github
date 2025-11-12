// import * as core from "@actions/core";
import fs from "fs";

const message = process.env.INPUT_MESSAGE;
const slackWebhookUrl = process.env.INPUT_SLACK_WEBHOOK_URL;
const messageType = process.env.INPUT_TYPE;

if (!message) {
  console.error("missing 'message' required param");
  process.exit(1);
}

if (!slackWebhookUrl) {
  console.error("missing 'slack_webhook_url' required param");
  process.exit(1);
}

const main = async () => {
  await fetch(slackWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attachments: [{ text: message, color: messageType }],
    }),
  });

  const sentMessage = `${new Date().toISOString()} - ${message}`;

  //   core.setOutput("sent_message", sentMessage);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `sent_message=${sentMessage}`);
};

main();
