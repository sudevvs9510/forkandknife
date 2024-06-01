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
exports.userController = void 0;
class userController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, phone, password } = req.body;
                console.log('Signup', req.body);
                const { user, token } = yield this.interactor.signup({ username, email, phone, password });
                console.log('returned' + user, token);
                res.status(200).json({ message: 'Signup Successful', user, token });
            }
            catch (err) {
                console.error('Error during signup', err);
                res.status(500).send('Internal server error');
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Login Controller');
                console.log('loginData ', req.body);
                const { email, password } = req.body;
                console.log(email, password);
                const { user, message, token, refreshToken } = yield this.interactor.login({ email, password });
                if (user) {
                    console.log('userController:', user, 'Token', token, 'refreshToken', refreshToken);
                    res.status(200).json({ message: 'Login Successful', user, token: refreshToken });
                }
                else {
                    console.log("");
                    res.status(401).json({ message: message });
                }
            }
            catch (err) {
                console.error('Error login:', err);
                res.status(500).send("Interanle server error");
            }
        });
    }
}
exports.userController = userController;
