import nodemailer from 'nodemailer'

const nodemailerEmailSeller = async (email: string) : Promise <{success: boolean}> =>{
   
   const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
         user: process.env.MAILER_USER,
         pass: process.env.MAIL_PASS
      },
      tls: {
         rejectUnauthorized: false
      }
   });

   const mailOptions : nodemailer.SendMailOptions = {
      from: process.env.MAILER_USER,
      to: `${email}`,
      subject: "Fork & Knife",
      html:`<p>Your registration on Fork & Knife is completed, wait for the confirmation</p>`
   }

   try{
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent:", info.response);
      return { success: true }
   } catch(error){
      console.error("Error sending email:", error)
      return { success: false }
   }
}

export default nodemailerEmailSeller