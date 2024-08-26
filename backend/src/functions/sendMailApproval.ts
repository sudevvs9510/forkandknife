import nodemailer from 'nodemailer'

const nodeMailerRestaurantApprovalMail = async (email: string): Promise<{success: boolean}> =>{

   const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
         user: process.env.MAILER_USER,
         pass: process.env.MAIL_PASS
      },
      tls: {
         rejectUnauthorized: false
      }
   })

   const mailOptions : nodemailer.SendMailOptions = {
      from : process.env.MAILER_USER,
      to: `${email}`,
      subject: "Fork & Knife",
      html: `<p>Thank you for using our service. As requested , your restaurant is confirmed</p>
      <h2 style="color : green"><strong><a href='https://forkandknife.vercel.app/restaurant/login'>Login to your account</a></strong></h2>

      <p>Thank you,</p>
      <p>Fork & Knife</p>`,
   }

   try{
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent:", info.response)
      return { success: true }
   } catch(error){
      console.log("Error sending mail",error)
      return { success : false }
   }
}

export default nodeMailerRestaurantApprovalMail;