import transporter from "../smtp/transporter.smtp.js";


const sendResetPwdEmail = async (email, link) => {
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Forgot password email",
        html: `<p> Verify your mail by clicking on this link ${link} </p>`
    };

    return transporter.sendMail(mailOptions);

}

export default sendResetPwdEmail;