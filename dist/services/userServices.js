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
exports.updateUser = exports.addUser = exports.getUserByEmail = exports.getUserById = exports.getUser = void 0;
const user_1 = require("../models/user");
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.UserModel.find();
        return users;
    }
    catch (error) {
        throw new Error("Error getting user: " + error);
    }
});
exports.getUser = getUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOne({ _id: id });
        return user;
    }
    catch (error) {
        throw new Error("Error getting user: " + error);
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOne({ email: email });
        return user;
    }
    catch (error) {
        throw new Error("Error getting user: " + error);
    }
});
exports.getUserByEmail = getUserByEmail;
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
const updateUser = (userId, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.UserModel.findOneAndUpdate({ _id: userId }, { $set: updatedUser }, { new: true });
        return user;
    }
    catch (error) {
        throw new Error("Error updating user: " + error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userServices.js.map