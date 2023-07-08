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

//Detects new connection and executes content
io.on('connection', (socket) => {
  console.log('New socket');

  //Prints msg on emit('message') in chat.js
  socket.on('message', (message : string) => {
    io.emit('messageFromServer', {message});
  });

  //On disconnect, print msg
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

//Shows index.html file as the default/home page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, '/www', 'index.html'));
});

//When localhost:3000/chat.js, locate and send chat.js file
app.get('/chat.js', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', '/www', '/ts', 'chat.js'));
})

app.use(express.json());

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