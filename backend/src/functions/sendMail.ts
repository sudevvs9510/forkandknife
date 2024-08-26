const nodemailer = require('nodemailer')



export const createNodemailerOtp = async (email: string, otp: number): Promise<{ success: boolean }> =>{

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.MAILER_USER,
         pass: process.env.MAIL_PASS
      },
      tls: {
         rejectUnauthorized: false
      }
   });

   const mailOptions = {
      from: process.env.MAILER_USER,
      to: email,
      subject: 'Signup verification mail from Fork & Knife',
      text: `Your otp for verification is ${otp}`
   };

   try {
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent", info.response)
      return { success: true }
   } catch (err) {
      console.error(err);
      return { success: false }
   }
}
