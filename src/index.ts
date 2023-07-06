import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user"
import mongoose from "mongoose"
import path from "path"
import io from "socket.io"

const app = express()
app.use(express.json())

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, '/www', 'index.html'))
})

//Routers
app.use("/api/v1/users", userRouter)

dotenv.config()

const PUERTO = process.env.PORT || 3000;
const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@proyectocomponentes.jga5vk8.mongodb.net/?retryWrites=true&w=majority`

const connectMongoDb = async () => {
  try{
    await mongoose.connect(url)
    console.log("Successfully connected to MongoDB")
  }catch(e){
    console.log("Failed to connect to MongoDB: " + e)
  }
}

connectMongoDb()

app.listen(PUERTO, () => {
  console.log(`The server is listening on the port ${PUERTO}...`);
});