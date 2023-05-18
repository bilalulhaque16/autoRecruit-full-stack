import transporter from "../smtp/transporter.smtp.js";


const sendInvitationEmail = async (arg) => {
    let { email, message } = arg;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Invite for interview",
        html: `<div style='text-align: center'>
        <h1>Congratulations !!!</h1>
        <h2>You're selected for interview at Kaispe</h2>
        <p>${message}</p>
        </div>`
    };

    return transporter.sendMail(mailOptions);

}

export default sendInvitationEmail