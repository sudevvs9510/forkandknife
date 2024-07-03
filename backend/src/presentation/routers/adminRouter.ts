import express from 'express';
import { adminRepositoryImpl } from "../../domain/interactors/respositories/admin-repositoryImpl"
import { AdminInteractorImpl } from '../../domain/interactors/usecases/adminInteractor';
import { adminController } from "../controllers/admin-controller"
import authenticateToken from "../middlewares/authenticateToken"

const repository = new adminRepositoryImpl()
const interactor = new AdminInteractorImpl(repository)
const controller = new adminController(interactor)


const adminRouter = express.Router()

adminRouter.post('/login',controller.adminLogins.bind(controller))
adminRouter.get('/restaurant-lists', authenticateToken('admin'), controller.getRestaurants.bind(controller))
adminRouter.get('/restaurants-approval-lists', authenticateToken('admin') ,controller.approveRestaurantList.bind(controller))


adminRouter.get("/restaurant-approval/:id", authenticateToken('admin') ,controller.approveRestaurant.bind(controller))
adminRouter.put("/restaurant-approval/:id", authenticateToken('admin') , controller.restaurantApprovalConfirmation.bind(controller))

adminRouter.put('/restaurant-reject/:id', authenticateToken('admin') ,controller.restaurantRejection.bind(controller))


export default adminRouter