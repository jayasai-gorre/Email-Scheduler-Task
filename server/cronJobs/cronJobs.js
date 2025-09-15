import { getScheduledEmailsDue, deleteScheduledEmails } from "../emailModels/emailModel.js";
import transporter from "../db/mailer.js";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (recipients, subject, message) => {
  console.log(process.env.mail);

  const mailOptions = {
    from: process.env.email,
    to: recipients,
    subject,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333333;
          }

          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #333333;
          }

          p {
            color: #555555;
            line-height: 1.5;
          }

          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            text-align: center;
          }

          a {
            color: #1a73e8;
            text-decoration: none;
          }

          /* Dark mode support */
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #121212;
              color: #f4f4f4;
            }
            .container {
              background-color: #1e1e1e;
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
            }
            h1 {
              color: #ffffff;
            }
            p {
              color: #cccccc;
            }
            .footer {
              color: #aaaaaa;
            }
            a {
              color: #8ab4f8;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${subject}</h1>
          <p>${message}</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.<br/>
            <a href="#">Unsubscribe</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const runEmailCron = async () => {
  try {
    console.log("Running email cron at", new Date().toLocaleString());

    const emailsToSend = await getScheduledEmailsDue();
    console.log("Emails fetched from DB:", emailsToSend);

    if (!emailsToSend.length) {
      console.log("No emails to send at this time.");
      return;
    }

    for (const email of emailsToSend) {
      console.log(`Sending email to: ${email.recipients}`);
      await sendEmail(email.recipients, email.subject, email.message);
    }

    const idsToDelete = emailsToSend.map((e) => e.id);
    await deleteScheduledEmails(idsToDelete);

    console.log(`Sent & cleared ${emailsToSend.length} scheduled emails.`);
  } catch (err) {
    console.error("Cron job error:", err);
  }
};

export default runEmailCron;
