import express from 'express';
import { adminRepositoryImpl } from "../../domain/interactors/respositories/admin-repositoryImpl"
import { AdminInteractorImpl } from '../../domain/interactors/usecases/adminInteractor';
import { adminController } from "../controllers/admin-controller"
import authenticateToken from "../middlewares/authenticateToken"

const repository = new adminRepositoryImpl()
const interactor = new AdminInteractorImpl(repository)
const controller = new adminController(interactor)


const adminRouter = express.Router()


adminRouter.get("/verify", authenticateToken("admin"), (_req, res) => {
  res.status(200).json({ message: "Admin verified" })
})

adminRouter.post('/login',controller.adminLogins.bind(controller))
adminRouter.get('/restaurant-lists', authenticateToken('admin'), controller.getRestaurants.bind(controller))
adminRouter.patch("/block-restaurant", controller.blockRestaurant.bind(controller))

adminRouter.get('/restaurants-approval-lists', authenticateToken('admin') ,controller.approveRestaurantList.bind(controller))


adminRouter.get("/restaurant-approval/:restaurantId", authenticateToken('admin') ,controller.approveRestaurant.bind(controller))
adminRouter.put("/restaurant-approval/:restaurantId", authenticateToken('admin') , controller.restaurantApprovalConfirmation.bind(controller))

adminRouter.put('/restaurant-reject/:restaurantId', authenticateToken('admin') ,controller.restaurantRejection.bind(controller))


adminRouter.get("/user-management",authenticateToken('admin'),controller.getUserLists.bind(controller))
adminRouter.patch("/block-user",authenticateToken('admin'), controller.blockUser.bind(controller))

adminRouter.get("/dashboard", controller.adminDashboard.bind(controller))

adminRouter.get("/download-report", controller.downloadAdminReport.bind(controller))

adminRouter.post('/logout', controller.adminLogout.bind(controller))

export default adminRouter