import express from 'express';
import { adminRepositoryImpl } from "../../domain/interactors/respositories/admin-repositoryImpl"
import { AdminInteractorImpl } from '../../domain/interactors/usecases/adminInteractor';
import { adminController } from "../controllers/admin-controller"


const repository = new adminRepositoryImpl()
const interactor = new AdminInteractorImpl(repository)
const controller = new adminController(interactor)


const adminRouter = express.Router()

adminRouter.post('/login',controller.adminLogins.bind(controller))
adminRouter.get('/restaurant-lists', controller.getRestaurants.bind(controller))
adminRouter.get('/restaurants-approval-lists',controller.approveRestaurantList.bind(controller))


adminRouter.get("/restaurant-approval/:id",controller.approveRestaurant.bind(controller))
adminRouter.put("/restaurant-approval/:id", controller.restaurantApprovalConfirmation.bind(controller))

adminRouter.put('/restaurant-reject/:id',controller.restaurantRejection.bind(controller))


export default adminRouter