import dotenv from 'dotenv'
dotenv.config()

const configKeys = {
   PORT: process.env.PORT,
   MONGO_DB_URL: process.env.DATABASE as string,
   JWT_SECRET_KEY : process.env.JWT_SECRET_KEY as string,
   JWT_RESFRESH_SECRET_KEY : process.env.JWT_REFRESH_SECRET_KEY as string
 }
console.log(process.env.ORIGIN)
export const corsConfig = <{ origin: string, credentials: boolean, }>{ origin: process.env.ORIGIN || '', credentials: true }


export default configKeys