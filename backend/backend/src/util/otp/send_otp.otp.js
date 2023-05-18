import {saveOTP} from "../db_calls/otp.calls.js";
import transporter from "../smtp/transporter.smtp.js";


const sendOTPVerificationEmail = async (model, result, link) => {
    // let { email, _id } = result;
    // const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    // const mailOptions = {
    //     from: process.env.AUTH_EMAIL,
    //     to: email,
    //     subject: "Verify your mail",
    //     html: `<div>
    //     <p> Enter via ${otp} </p>
        
    //     </div>`
    // };
    // saveOTP(model, _id, otp)

    // return transporter.sendMail(mailOptions);




    let { email, _id, otp } = result;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Verify your mail",
        html: `<div>
        <p> Enter via ${otp} </p>
        <h2>OR</h2>
        <p> Enter via this link ${link} </p>
        </div>`
    };
    saveOTP(model, _id, otp)

    return transporter.sendMail(mailOptions);

}

export default sendOTPVerificationEmail