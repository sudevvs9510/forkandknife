import express, { Router } from 'express'
import { refreshAccessToken } from '../middlewares/refreshTokenAuth'


const tokenRouter : Router = Router();

tokenRouter.post("/refresh-token",refreshAccessToken)



export default tokenRouter;