import express from 'express'
import { userController } from '../controllers/user-controller'
import { UserRepositoryImpl } from '../../domain/interactors/respositories/user-respositoryImpl'
import { UserInteractorImpl } from '../../domain/interactors/usecases/userInteractorImpl'
import { MailerImpl } from '../../domain/lib/mailerImp'
import {userExists} from '../middlewares/userExists'
import verifyToken from "../middlewares/userAuth"
import authenticateToken from "../middlewares/authenticateToken"

const repository =  new UserRepositoryImpl()
const mailer = new MailerImpl()
const interactor = new UserInteractorImpl(repository, mailer)
const controller = new userController(interactor)

const userRouter  = express.Router()


userRouter.get('/',()=>console.log("Home Page"));


userRouter.post('/login',controller.login.bind(controller))
userRouter.post('/signup', userExists, controller.signup.bind(controller))

userRouter.post('/google-login', controller.googleLogin.bind(controller))

userRouter.post('/verify-otp',controller.verifyOTP.bind(controller))
userRouter.post('/resend-otp', controller.ResendOtp.bind(controller));

userRouter.post('/reset-password', controller.resetPasswordGetUser.bind(controller))
userRouter.put('/reset-password/:id', controller.resetPasswordUpdate.bind(controller))

userRouter.get('/restaurants',controller.getRestaurants.bind(controller))
userRouter.get('/search-restaurants', controller.searchRestaurants.bind(controller))


userRouter.post('/refresh-token', controller.refreshToken.bind(controller));

userRouter.post('/logout',verifyToken, controller.Logout.bind(controller))

export default userRouter;