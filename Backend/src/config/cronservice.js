const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Reminder = require('../models/Reminder.model');

// Set up Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReminderEmail = async (toEmail, reminder, label) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `⚠️ Court Hearing Reminder (${label}) — ${reminder.caseTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0F172A;">NyayaAI Court Hearing Reminder</h2>
        <p>Hello ${reminder.userId?.name ?? 'there'},</p>
        <p>This is an automated reminder for your upcoming court hearing <strong>${label.toLowerCase()}</strong>.</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Case Title:</strong> ${reminder.caseTitle}</p>
          <p><strong>Details:</strong> ${reminder.description}</p>
          <p><strong>Hearing Date:</strong> ${reminder.hearingDate.toDateString()}</p>
        </div>
        <p>Please ensure all your legal documentation is organised and ready.</p>
        <p>Best regards,<br/><strong>NyayaAI Team</strong></p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

const initCronJobs = () => {
  // Run every day at 9:00 AM
  cron.schedule('* * * * *', async () => {
    console.log('Running daily court hearing reminder check...');

    try {
      const now = new Date();

      // Window: today
      const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
      const todayEnd   = new Date(now); todayEnd.setHours(23, 59, 59, 999);

      // Window: tomorrow
      const tomorrowStart = new Date(now); tomorrowStart.setDate(now.getDate() + 1); tomorrowStart.setHours(0, 0, 0, 0);
      const tomorrowEnd   = new Date(now); tomorrowEnd.setDate(now.getDate() + 1);   tomorrowEnd.setHours(23, 59, 59, 999);

      // Fetch reminders for today AND tomorrow, populate user email
      const reminders = await Reminder.find({
        hearingDate: { $gte: todayStart, $lte: tomorrowEnd },
        isNotified: false
      }).populate('userId', 'name email');

      if (reminders.length === 0) {
        console.log('No upcoming hearings found.');
        return;
      }

      for (const reminder of reminders) {
        const userEmail = reminder.userId?.email || process.env.TEST_RECEIVER_EMAIL;
        if (!userEmail) {
          console.warn(`No email for reminder ${reminder._id}, skipping.`);
          continue;
        }

        const isToday = reminder.hearingDate >= todayStart && reminder.hearingDate <= todayEnd;
        const label   = isToday ? 'TODAY' : 'TOMORROW';

        await sendReminderEmail(userEmail, reminder, label);

        reminder.isNotified = true;
        await reminder.save();

        console.log(`Reminder sent to ${userEmail} for case: ${reminder.caseTitle} (${label})`);
      }
    } catch (error) {
      console.error('Error executing daily cron job:', error);
    }
  });
};

module.exports = { initCronJobs };