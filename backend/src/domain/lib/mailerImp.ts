import { IMailer } from "../../Config/mailer";
import { otpGenerator } from '../../functions/OTP-Generator'
import { createNodemailerOtp } from '../../functions/sendMail'


export class MailerImpl implements IMailer{
   
   async sendEmail(email: string): Promise<{ otp: number | null; success: boolean }>{
      const otp = otpGenerator.generateOtp()
      console.log('OTP',otp)
      const result = await createNodemailerOtp(email, otp)
      return { otp, success: result.success }
   }
}