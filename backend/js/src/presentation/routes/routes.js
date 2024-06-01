"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter_1 = __importDefault(require("../routers/userRouter"));
const routes = (app) => {
    app.use('/', userRouter_1.default);
    // app.use('/admin', adminRouter)
};
exports.default = routes;
