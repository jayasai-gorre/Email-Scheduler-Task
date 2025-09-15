import db from "../db/db.js";


export const insertScheduledEmail = async ({ subject, message, recipients, scheduleTime }) => {
  const recipientsStr = recipients.join(',');
  const query = `INSERT INTO scheduled_emails (subject, message, recipients, schedule_time) VALUES (?, ?, ?, ?)`;
  await db.query(query, [subject, message, recipientsStr, scheduleTime]);
};


export const getScheduledEmailsDue = async () => {
  const query = `SELECT * FROM scheduled_emails WHERE schedule_time <= NOW()`;

  const [results] = await db.query(query);

  return results.map(email => ({
    id: email.id,
    subject: email.subject,
    message: email.message,
    recipients: email.recipients.split(','),
    scheduleTime: email.schedule_time,
  }));
};


export const deleteScheduledEmails = async (ids) => {
  if (!ids.length) return;
  const query = `DELETE FROM scheduled_emails WHERE id IN (?)`;
  await db.query(query, [ids]);
};
