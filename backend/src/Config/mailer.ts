import dotenv from 'dotenv'
dotenv.config()

export interface MailerConfig{
   user: string,
   pass:string 
}

export const Mailer = <MailerConfig>{
   user: process.env.MAILER_USER,
   pass: process.env.MAILER_PASS
}

// export default Mailer
export interface IMailer{
   sendEmail(email: string): Promise<{ otp: number | null, success: boolean}>
}