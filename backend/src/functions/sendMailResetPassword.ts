import nodemailer from 'nodemailer'

const reset_PasswordMailer = async (email: string, userId: string): Promise<{ success: boolean }> => {


   const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
         user: 'sudevvs1999@gmail.com',
         pass: 'vgqa lnmt ssyq ivrk'
      },
      tls: {
         rejectUnauthorized: false
      }
   })


   const mailOptions: nodemailer.SendMailOptions = {
      from: 'sudevvs1999@gmail.com',
      to: email,
      subject: 'Fork and Knife - Reset Password',
      html: `<p>Dear user,</p>
            <p>Please click this link for your reset-password</p>
            <button style="background-color : blue; width:150px; height : 50px; border-radius: 12px; cursor: pointer; border:none;"><a href='http://localhost:3000/reset-password/${userId}' style="text-decoration: none; color: #ffffff; font-size: 16px; font-family: sans-serif; font-weight: 600;">Reset password</a></button>
            <p>If you did not request have any concerns, please contact our support team immediately.</p>
            <p>Thank you,</p>
            <p>Fork and Knife</p>`,
   }

   try{
      const info = await transporter.sendMail(mailOptions)
      console.log("Email sent:", info.response)
      return { success: true }
   } catch (error){
      console.log("Error sending email: ",error);
      return { success: false }
   }
}

export default reset_PasswordMailer;