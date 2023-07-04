import express, { Request, Response } from 'express';
import { body, param, validationResult } from "express-validator";
import * as userServices from "../services/userServices"
import { User } from '../models/user';

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


router.post("/",[body("name").isString(),body("email").isEmail(),body("password").isString().isLength({ min: 5})], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, password} = req.body as User
    const newUserEntry = await userServices.addUser({
    name,
    email,
    password
    })
        
    res.json(newUserEntry)
    return
})

router.put("/:id",[param("id").isNumeric(), body("name").optional().isString(), body("email").optional().isEmail(), body("password").optional().isString().isLength({ min: 5})], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const userId: number = parseInt(req.params.id)
    const {name, email, password} = req.body as User
    const userData = await userServices.updateUser(userId, {name, email, password})
    if(userData){
    res.json(userData)
    }
    return
})


export default router