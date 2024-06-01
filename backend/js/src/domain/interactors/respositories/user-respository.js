"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const userModel_1 = __importDefault(require("../../../frameworks/database/models/userModel"));
const accessToken_generator_1 = require("../../../functions/accessToken-generator");
const jwt = require('jsonwebtoken');
class UserRepositoryImpl {
    findByCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("USER REPOSITORY ----");
            console.log(email, password);
            const user = yield userModel_1.default.findOne({
                $or: [
                    { email: email },
                    { username: email }
                ]
            });
            console.log('user', user);
            let message = '';
            let token = null;
            if (!user) {
                message = "Invalid User";
            }
            else {
                if (password !== user.password) {
                    console.log('Invalid password');
                    message = "Invalid password";
                }
                else {
                    token = (0, accessToken_generator_1.generateAccessToken)(user);
                    console.log('Token', token);
                }
            }
            if (user && !message) {
                return { user: user.toObject(), message, token };
            }
            else {
                console.log('message', message);
                return { user: null, message, token };
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Repository');
                console.log(user);
                const { username, email, phone, password } = user;
                const newUser = new userModel_1.default({ username, email, phone, password });
                yield newUser.save();
                let token = (0, accessToken_generator_1.generateAccessToken)(user);
                console.log('Token', token);
                return { user: newUser ? newUser.toObject() : null, token };
            }
            catch (err) {
                console.error('Error saving user', err);
                throw err;
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
