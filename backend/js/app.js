"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const connection_1 = __importDefault(require("./src/frameworks/database/connection"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./src/frameworks/webServer/server"));
const routes_1 = __importDefault(require("./src/presentation/routes/routes"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./src/config");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(config_1.corsConfig));
(0, connection_1.default)();
(0, server_1.default)(server).startServer();
(0, routes_1.default)(app);
