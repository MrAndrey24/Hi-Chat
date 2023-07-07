import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";

//Creating socket.io server
const app = express();
const server = require("http").createServer(app);
const io = new Server(server);

//Detects new connection and prints msg
io.on('connection', (socket) => {
  console.log('New socket');

  //Imprime message cuando el servidor recive un mensaje
  socket.on('message', (message: string) => {
    console.log(message);
  });

  //On disconnect, print msg
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

app.use(express.json());

//Shows index.html file when starting server
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, '/www', 'index.html'));
});

app.get('/chat.js', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', '/www', '/ts', 'chat.js'));
})

//Routers
app.use("/api/v1/users", userRouter);

dotenv.config();

const PUERTO = process.env.PORT || 3000;
const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@proyectocomponentes.jga5vk8.mongodb.net/?retryWrites=true&w=majority`;

const connectMongoDb = async () => {
  try{
    await mongoose.connect(url);
    console.log("Successfully connected to MongoDB");
  }catch(e){
    console.log("Failed to connect to MongoDB: " + e);
  }
};

connectMongoDb();

server.listen(PUERTO, () => {
  console.log(`The server is listening on the port ${PUERTO}...`);
});