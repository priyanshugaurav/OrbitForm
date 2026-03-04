import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import "dotenv/config";

const ses = new SESClient({
  region: "ap-south-1", // MUST match your SES region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function sendEmail() {
  const params = {
    Source: "priyanshugaurav01@gmail.com", // must be verified
    Destination: {
      ToAddresses: ["priyanshugaurav01@gmail.com"],
    },
    Message: {
      Subject: {
        Data: "Welcome to our app",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: "<h1>Hello 👋</h1><p>This is a test email by priyanshu to priyanshu.</p>",
          Charset: "UTF-8",
        },
        Text: {
          Data: "Hello 👋\nThis is a test email.",
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await ses.send(command);
    console.log("Email sent:", response.MessageId);
  } catch (error) {
    console.error("SES error:", error);
  }
}

sendEmail();
