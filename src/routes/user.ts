import express from 'express';
import * as userServices from "../services/userServices"
import { User } from '../models/user';

const router = express.Router();

router.get("/",(_req, res) => {
    res.send(userServices.getUser())
})

router.post("/",(req, res) => {

    const {name, email, password} = req.body as User
    const newUserEntry = userServices.addUser({
    name,
    email,
    password
    })
        
    res.json(newUserEntry)
})


export default router