import { config } from "dotenv";
import {env} from 'process'
config()
export const Constants = {
  BASE_URL: env.VITE_APP_BASE_URL
};


export const configKeysJwt = {
  JWT_SECRET_KEY : process.env.JWT_SECRET_KEY as string
}
