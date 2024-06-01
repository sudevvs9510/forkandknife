"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const user_respository_1 = require("../../domain/interactors/respositories/user-respository");
const userInteractor_1 = require("../../domain/interactors/usecases/userInteractor");
const repository = new user_respository_1.UserRepositoryImpl();
// const mailer = new MailerImpl()
const interactor = new userInteractor_1.UserInteractorImpl(repository);
const controller = new user_controller_1.userController(interactor);
const userRouter = express_1.default.Router();
userRouter.post('/login', controller.login.bind(controller));
userRouter.post('/signup', controller.signup.bind(controller));
exports.default = userRouter;
