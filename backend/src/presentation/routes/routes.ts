import { Application } from "express";
import userRouter from "../routers/userRouter";
import adminRouter from "../routers/adminRouter"
import restaurantRouter from "../routers/restaurantRouter"
import tokenRefresh from "../routers/authTokenRouter"

const routes : Function = (app: Application) =>{
   app.use('/',userRouter)
   app.use('/admin', adminRouter)
   app.use('/restaurant', restaurantRouter)
   app.use('/token',tokenRefresh)
}

export default routes   