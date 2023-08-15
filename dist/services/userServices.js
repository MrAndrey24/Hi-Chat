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
exports.addUser = exports.userLogin = void 0;
const user_1 = require("../models/user");
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOne({ email: email, password: password });
        if (user) {
            return user.name;
        }
        return null;
    }
    catch (error) {
        throw new Error("Error getting user: " + error);
    }
});
exports.userLogin = userLogin;
const addUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = new user_1.UserModel(newUser);
        const savedUser = yield createdUser.save();
        return savedUser;
    }
    catch (e) {
        throw new Error("Error adding user: " + e);
    }
});
exports.addUser = addUser;
//# sourceMappingURL=userServices.js.map