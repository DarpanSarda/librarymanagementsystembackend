const nodemailer = require('nodemailer')

function sendEmail(email, subject, message) {
    console.log("nodemailer" ,email)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        text: message,
    }

    transporter.sendMail(mailOptions)
}

module.exports = { sendEmail }