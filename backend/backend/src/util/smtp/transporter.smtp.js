import nodemailer from "nodemailer";
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// Node mailer stuff
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'mhaque@alumni.uit.edu',
      pass: 'zpnrzyoyjghwomdl'
    }
  })



// let transporter = nodemailer.createTransport({
//   host: "smtp.office365.com",
//   port: 587,
//   secureConnection: false,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     // user: process.env.AUTH_EMAIL,
//     // pass: process.env.AUTH_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

export default transporter;