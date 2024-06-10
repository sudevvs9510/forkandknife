import express from 'express'
import { userController } from '../controllers/user-controller'
import { UserRepositoryImpl } from '../../domain/interactors/respositories/user-respositoryImpl'
import { UserInteractorImpl } from '../../domain/interactors/usecases/userInteractorImpl'
import { MailerImpl } from '../../domain/lib/mailerImp'
import {userExists} from '../middlewares/userExists'


const repository =  new UserRepositoryImpl()
const mailer = new MailerImpl()
const interactor = new UserInteractorImpl(repository, mailer)
const controller = new userController(interactor)

const userRouter  = express.Router()


userRouter.get('/',()=>console.log("Home Page"));


userRouter.post('/login', controller.login.bind(controller))
userRouter.post('/signup',userExists, controller.signup.bind(controller))
userRouter.post('/verify-otp',controller.verifyOTP.bind(controller))
userRouter.post('/google-login', controller.googleLogin.bind(controller))

userRouter.post('/resend-otp', controller.ResendOtp.bind(controller));
userRouter.post('/logout', controller.Logout.bind(controller))


export default userRouter;