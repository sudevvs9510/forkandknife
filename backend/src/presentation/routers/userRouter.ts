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

userRouter.post('/reset-password',authenticateToken('user'), controller.resetPasswordGetUser.bind(controller))
userRouter.put('/reset-password/:id',authenticateToken('user'), controller.resetPasswordUpdate.bind(controller))

userRouter.get('/restaurants',authenticateToken('user'),controller.getRestaurants.bind(controller))
userRouter.get("/restaurant-view/:restaurantId",authenticateToken('user'), controller.restaurantDetalis.bind(controller))


userRouter.get('/search-restaurants',authenticateToken('user'), controller.searchRestaurants.bind(controller))

userRouter.get("/user-profile/:userId",authenticateToken('user'), controller.getUserProfile.bind(controller))
userRouter.put('/update-userDetails/:userId',authenticateToken('user'),controller.updateUserDetails.bind(controller))


userRouter.get("/restaurant-table-details/:tableId",authenticateToken('user'), controller.restaruantTableDetails.bind(controller))
userRouter.post("/restaurant-table-slots", authenticateToken('user'),controller.restaurantTableSlots.bind(controller))


userRouter.post("/make-payment", authenticateToken("user"),controller.makePayment.bind(controller))

userRouter.post("/update-slot-and-booking-status",authenticateToken('user'), controller.updateSlotAndBookingStatus.bind(controller))

userRouter.get("/booking-history/:userId",authenticateToken('user'), controller.userBookingHistory.bind(controller))
userRouter.get('/booking-details/:bookingId',authenticateToken('user'), controller.getBookingDetails.bind(controller));


userRouter.post("/add-review/:restaurantId",authenticateToken('user'), controller.addReviews.bind(controller))
userRouter.get("/get-reviews/:restaurantId",authenticateToken('user'), controller.getReviews.bind(controller))

userRouter.post("/add-money-to-wallet", controller.addMoneyToWallet.bind(controller))
userRouter.get("/wallet-details/:userId", controller.getWalletDetails.bind(controller))

userRouter.post("/cancel-booking/:bookingId", controller.cancelBooking.bind(controller))

// userRouter.post('/refresh-token', controller.refreshToken.bind(controller));

userRouter.post('/logout', controller.Logout.bind(controller))

export default userRouter;