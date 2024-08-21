import express from 'express'
import { restaurantController } from "../../presentation/controllers/restaurant-controller"
import { sellerInteractor } from "../../domain/interactors/usecases/sellerInteractor"
import { sellerRepository } from "../../domain/interactors/respositories/restaurant-repositoryImpl"
import restaurant_Exists from "../middlewares/restaurant_Exists"
import authenticateToken from "../middlewares/authenticateToken"
import {restaurantBlock} from "../middlewares/restaurantBlock"

const repository = new sellerRepository()
const interactor = new sellerInteractor(repository)
const controller = new restaurantController(interactor)
const restaurantRouter = express.Router()


restaurantRouter.get("/verify", authenticateToken("restaurant"), restaurantBlock, (_req, res) => {
  res.status(200).json({ message: "Restaurant verified" })
})

restaurantRouter.post('/registration', restaurant_Exists, controller.restaurantResgistration.bind(controller))
restaurantRouter.post('/login',controller.restaurantLogin.bind(controller))

restaurantRouter.put("/restaurant-updation",authenticateToken('restaurant'),restaurantBlock ,controller.restaurant_updation.bind(controller))

restaurantRouter.get('/restaurant-details',authenticateToken('restaurant'),restaurantBlock , controller.restaurant_details.bind(controller))


restaurantRouter.get("/tables/:restaurantId",authenticateToken('restaurant'),restaurantBlock ,controller.getRestaurantTable.bind(controller))
restaurantRouter.post("/add-table",authenticateToken('restaurant'), restaurantBlock ,controller.addRestaurantTable.bind(controller))
restaurantRouter.post("/delete-table", authenticateToken('restaurant'),restaurantBlock , controller.deleteRestaurantTable.bind(controller))


restaurantRouter.get('/table-slots/:tableId', authenticateToken('restaurant'),restaurantBlock ,controller.getRestaurantTableSlot.bind(controller))
restaurantRouter.post('/add-table-slot',authenticateToken('restaurant'),restaurantBlock ,controller.addRestaurantTableSlot.bind(controller))
restaurantRouter.post("/delete-table-slot",authenticateToken('restaurant'),restaurantBlock ,controller.deleteRestaurantTableSlot.bind(controller))

restaurantRouter.get("/time-slots",authenticateToken('restaurant'),restaurantBlock , controller.getTimeSlot.bind(controller))
restaurantRouter.post("/add-time-slot",authenticateToken('restaurant'),restaurantBlock , controller.addRestaurantTimeSlot.bind(controller))
restaurantRouter.post("/delete-time-slot",authenticateToken('restaurant'),restaurantBlock ,controller.deleteRestaurantTimeSlot.bind(controller))

restaurantRouter.get('/user-details/:userId',authenticateToken('restaurant'),restaurantBlock , controller.getUserDetails.bind(controller))

restaurantRouter.get('/table-reservations/:restaurantId',authenticateToken('restaurant'),restaurantBlock , controller.tableReservation.bind(controller))

restaurantRouter.get('/reservation-details/:bookingId',authenticateToken('restaurant'),restaurantBlock , controller.getBookingDetails.bind(controller))
restaurantRouter.patch('/booking-status-edit/:bookingId',authenticateToken('restaurant'),restaurantBlock , controller.editBookingStatus.bind(controller))

restaurantRouter.get("/dashboard/:restaurantId",authenticateToken('restaurant'),restaurantBlock , controller.dashboard.bind(controller))

restaurantRouter.get('/download-report/:restaurantId',authenticateToken('restaurant'),restaurantBlock , controller.downloadReport.bind(controller))

restaurantRouter.post('/logout', controller.restaurantLogout.bind(controller))

export default restaurantRouter