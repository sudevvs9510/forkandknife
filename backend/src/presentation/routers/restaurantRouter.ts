import express from 'express'
import { restaurantController } from "../../presentation/controllers/restaurant-controller"
import { sellerInteractor } from "../../domain/interactors/usecases/sellerInteractor"
import { sellerRepository } from "../../domain/interactors/respositories/restaurant-repositoryImpl"
import restaurant_Exists from "../middlewares/restaurant_Exists"
import authenticateToken from "../middlewares/authenticateToken"

import multer from 'multer';

const repository = new sellerRepository()
const interactor = new sellerInteractor(repository)
const controller = new restaurantController(interactor)
const restaurantRouter = express.Router()

const upload = multer({ dest: 'uploads/' });


restaurantRouter.post('/registration', restaurant_Exists, controller.restaurantResgistration.bind(controller))
restaurantRouter.post('/login',controller.restaurantLogin.bind(controller))

restaurantRouter.put("/restaurant-updation",authenticateToken('restaurant'), controller.restaurant_updation.bind(controller))

restaurantRouter.get('/restaurant-details',authenticateToken('restaurant'), controller.restaurant_details.bind(controller))
// restaurantRouter.post('/upload', upload.single('file'), controller.uploadImage);

export default restaurantRouter