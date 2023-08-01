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

var connections : any = [];
var users: any = [];

//Detects new connection and executes content
io.on('connection', (socket) => {
  connections.push(socket);
  console.log('New socket: ' + connections.length + ' sockets connected.');

  //Prints msg on emit('message') in chat.js
  socket.on('message', (message : string) => {
    io.emit('messageFromServer', {message});
  });

  //On disconnect, print msg
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Socket disconnected: ' + connections.length + ' sockets connected.');
  });
});

//Shows index.html file as the default/home page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, '../src', '/www', 'login.html'));
});

app.get('/index', (_req, res) => {
  res.sendFile(path.join(__dirname, '../src', '/www', 'index.html'));
});

//When localhost:3000/chat.js, locate and send chat.js file
app.get('/chat.js', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', '/www', '/ts', 'chat.js'));
});

app.get('/login.js', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist', '/www', '/ts', 'login.js'));
});

app.use(express.json());

//Routers
app.use("/api/v1/users", userRouter);

dotenv.config();

const PUERTO = process.env.PORT || 3000;
const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@hi-chat.iofmsjz.mongodb.net/?retryWrites=true&w=majority`

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