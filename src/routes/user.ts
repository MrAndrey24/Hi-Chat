import express, { Request, Response } from 'express';
import { body, validationResult } from "express-validator";
import * as userServices from "../services/userServices"
import { User } from '../models/user';
// import { registerSchema } from '../schema/register-schema';
// import { validateRequestSchema } from '../middleware/validate-rquest-schema';

const router = express.Router();

router.get("/",(_req, res) => {
    res.send(userServices.getUser())
})

router.post("/",[  body("name").isString(),
body("email").isEmail(),
body("password").isString().isLength({ min: 5})],(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body as User
    const newUserEntry = userServices.addUser({
    name,
    email,
    password
    })
        
    res.json(newUserEntry)
    return
})


export default router