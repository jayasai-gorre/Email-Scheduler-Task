import { insertScheduledEmail } from "../emailModels/emailModel.js";

export const scheduleEmail = async (req, res) => {
  const { subject, message, recipients, scheduleTime } = req.body;

  if (!subject || !message || !recipients || !scheduleTime) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await insertScheduledEmail({ subject, message, recipients, scheduleTime });
    res.status(200).json({ message: "Email scheduled successfully." });
  } catch (err) {
    console.error("Error scheduling email:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
