import express, { Request, Response } from 'express';
import { body, param, validationResult } from "express-validator";
import * as userServices from "../services/userServices"
import { User, UserModel } from '../models/user';

const router = express.Router();

router.get("/", async (_req, res) => {
    const users = await userServices.getUser()
    res.send(users)
})

router.get("/:id", param("id").isNumeric(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const userId: number = parseInt(req.params.id);
    const user = await userServices.getUserById(userId);
    
    if (user) {
        res.send(user);
    } else {
        res.status(404).json({ message: "User not found" })
    }
    return
})


router.post("/",[body("name").isString().notEmpty(),body("email").isEmail().notEmpty(),body("password").isString().notEmpty().isLength({ min: 5})], async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const savedUser = await userServices.addUser(newUser)
        res.json(savedUser)
        return
    }catch(error){
        if (error === 11000) {
            // This error code means that the `name` or `email` field is already taken.
            return res.status(400).json({ error: error });
        } else {
            // This is an unexpected error.
            return res.status(500).json({ error: error });
        }
    }

    return
})

router.put("/:id",[param("id").isNumeric(), body("name").optional().isString(), body("email").optional().isEmail(), body("password").optional().isString().isLength({ min: 5})], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const userId: number = parseInt(req.params.id)
    const updatedUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try{
    const user = await userServices.updateUser(userId, updatedUser)
    if(user){
        res.json(user)
    }
    }

    return
})


export default router