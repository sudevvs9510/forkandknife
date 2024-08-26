import nodemailer from 'nodemailer'

const nodeMailerRestaurantRejectMail = async (email: string): Promise<{success: boolean}> =>{

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

   const rejectionMailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAILER_USER,
    to: `${email}`,
    subject: "Fork & Knife - Restaurant Registration",
    html: `<p>We regret to inform you that your restaurant registration has been rejected.</p>
           <p>If you have any questions or need further information, please do not hesitate to contact us.</p>
           <p>Thank you,</p>
           <p>Fork & Knife</p>`,
  };
  

   try{
      const info = await transporter.sendMail(rejectionMailOptions)
      console.log("Email sent:", info.response)
      return { success: true }
   } catch(error){
      console.log("Error sending mail",error)
      return { success : false }
   }
}

export default nodeMailerRestaurantRejectMail;