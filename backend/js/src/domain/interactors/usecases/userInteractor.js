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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractorImpl = void 0;
const refreshToken_generator_1 = require("../../../functions/refreshToken-generator");
class UserInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UserService');
                console.log('New user data:', userData);
                const newUser = {
                    username: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                };
                console.log(newUser);
                const { user, token } = yield this.Repository.save(newUser);
                console.log('Usercase returned', user, token);
                return { user, token };
            }
            catch (err) {
                console.error("Error during signup", err);
                throw err;
            }
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("userInteractor: LOGIN");
                console.log("email:", credentials.email);
                console.log("Password:", credentials.password);
                const { user, message, token } = yield this.Repository.findByCredentials(credentials.email, credentials.password);
                console.log("Usecase", user, token, message);
                const refreshToken = yield (0, refreshToken_generator_1.generateRefreshToken)(user);
                return { user, message, token, refreshToken };
            }
            catch (err) {
                console.error("Error during login:", err);
                throw err;
            }
        });
    }
}
exports.UserInteractorImpl = UserInteractorImpl;
