import { Application } from "express";
import userRouter from "../routers/userRouter";
import adminRouter from "../routers/adminRouter"

const routes : Function = (app: Application) =>{
   app.use('/',userRouter)
   app.use('/admin', adminRouter)
}

export default routes   