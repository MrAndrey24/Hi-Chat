"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userServices = __importStar(require("../services/userServices"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userServices.getUser();
    res.send(users);
}));
router.get("/:id", (0, express_validator_1.param)("id").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.params.id;
    const user = yield userServices.getUserById(userId);
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
    return;
}));
router.get("/email/:email", (0, express_validator_1.param)("email").isEmail(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userEmail = req.params.email;
    const user = yield userServices.getUserByEmail(userEmail);
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
    return;
}));
router.post("/", [(0, express_validator_1.body)("name").isString().notEmpty(), (0, express_validator_1.body)("email").isEmail().notEmpty(), (0, express_validator_1.body)("password").isString().notEmpty().isLength({ min: 5 })], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = new user_1.UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = yield userServices.addUser(newUser);
        res.json(savedUser);
        return;
    }
    catch (error) {
        if (error === 11000) {
            // This error code means that the `name` or `email` field is already taken.
            return res.status(400).json({ error: error });
        }
        else {
            // This is an unexpected error.
            return res.status(500).json({ error: error });
        }
    }
    return;
}));
router.put("/:id", [(0, express_validator_1.param)("id").isString(), (0, express_validator_1.body)("name").optional().isString(), (0, express_validator_1.body)("email").optional().isEmail(), (0, express_validator_1.body)("password").optional().isString().isLength({ min: 5 })], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const updateUser = {
        name: name,
        email: email,
        password: password
    };
    try {
        const user = yield userServices.updateUser(userId, updateUser);
        if (user) {
            res.json(user);
        }
        return res.status(404).json({ message: "User not found" });
    }
    catch (error) {
        console.log("Error updating user: " + error);
    }
    return;
}));
router.post("/login", [(0, express_validator_1.body)("email").isEmail().notEmpty(), (0, express_validator_1.body)("password").isString().notEmpty()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = yield userServices.userLogin(email, password);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
    return;
}));
router.delete("/:id", [(0, express_validator_1.param)("id").isString()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const user = yield userServices.deleteUser(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
    return;
}));
exports.default = router;
//# sourceMappingURL=user.js.map