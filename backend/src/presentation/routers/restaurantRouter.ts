import express from 'express'
import { restaurantController } from "../../presentation/controllers/restaurant-controller"
import { sellerInteractor } from "../../domain/interactors/usecases/sellerInteractor"
import { sellerRepository } from "../../domain/interactors/respositories/restaurant-repositoryImpl"
import restaurant_Exists from "../middlewares/restaurant_Exists"
import authenticateToken from "../middlewares/authenticateToken"

const repository = new sellerRepository()
const interactor = new sellerInteractor(repository)
const controller = new restaurantController(interactor)
const restaurantRouter = express.Router()


restaurantRouter.post('/registration', restaurant_Exists, controller.restaurantResgistration.bind(controller))
restaurantRouter.post('/login',controller.restaurantLogin.bind(controller))

restaurantRouter.put("/restaurant-updation",authenticateToken('restaurant'), controller.restaurant_updation.bind(controller))

restaurantRouter.get('/restaurant-details',authenticateToken('restaurant'), controller.restaurant_details.bind(controller))


restaurantRouter.get("/tables/:restaurantId",authenticateToken('restaurant'),controller.getRestaurantTable.bind(controller))
restaurantRouter.post("/add-table",authenticateToken('restaurant'),controller.addRestaurantTable.bind(controller))
// restaurantRouter.post("/delete-table", authenticateToken('restaurant'), controller.deleteRestaurantTable.bind(controller))


restaurantRouter.get('/table-slots/:tableId', authenticateToken('restaurant'),controller.getRestaurantTableSlot.bind(controller))
restaurantRouter.post('/add-table-slot',authenticateToken('restaurant'), controller.addRestaurantTableSlot.bind(controller))

restaurantRouter.get('/time-slots',authenticateToken('restaurant'), controller.getTimeSlot.bind(controller))
restaurantRouter.post('/add-time-slot',authenticateToken('restaurant'), controller.addRestaurantTimeSlot.bind(controller))

restaurantRouter.post('/logout', controller.restaurantLogout.bind(controller))

export default restaurantRouter