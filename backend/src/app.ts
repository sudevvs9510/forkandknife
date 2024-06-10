import express, { Application, Express } from "express"
import { config } from "dotenv"
import connectDB from "./frameworks/database/connection"
import http from "http"
import serverConfig from "./frameworks/webServer/server"
import routes from "./presentation/routes/routes"
import cors from 'cors'
import { corsConfig } from "./config"
import morgan from 'morgan'
import cookieParser from "cookie-parser"

config()   

const app: Application = express()

const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsConfig))
app.use(morgan('dev'))

connectDB()

serverConfig(server).startServer();

routes(app)





