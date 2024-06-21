const nodemailer = require('nodemailer');

// Replace with your Gmail credentials (not recommended for real applications)
const senderEmail = "trecymartha@gmail.com";
const senderPassword = "Prague@1130"; // Consider using App Passwords instead

async function sendEmail(name, email, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: senderEmail, // Change to recipient email address for production
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Assuming form data is accessible through req.body in your Express app
const express = require('express');
const app = express();

app.post('/sendscript', (req, res) => {
  const { name, email, message } = req.body;
  sendEmail(name, email, message)
    .then(() => res.send('Email sent successfully!'))
    .catch(() => res.status(500).send('Error sending email'));
});

const port = process.env.PORT || 3000; // Use environment variable for port

app.listen(port, () => console.log(`Server listening on port ${port}`));
