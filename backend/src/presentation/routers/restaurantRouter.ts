import express from 'express'
import { restaurantController } from "../../presentation/controllers/restaurant-controller"
import { sellerInteractor } from "../../domain/interactors/usecases/sellerInteractor"
import { sellerRepository } from "../../domain/interactors/respositories/restaurant-repositoryImpl"
import restaurant_Exists from "../middlewares/restaurant_Exists"

const repository = new sellerRepository()
const interactor = new sellerInteractor(repository)
const controller = new restaurantController(interactor)
const restaurantRouter = express.Router()


restaurantRouter.post('/registration', restaurant_Exists, controller.restaurantResgistration.bind(controller))
restaurantRouter.post('/login',controller.restaurantLogin.bind(controller))

restaurantRouter.put("/restaurant/restaurant-updation", controller.restaurant_updation.bind(controller))


export default restaurantRouter