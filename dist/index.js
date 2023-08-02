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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
//Creating socket.io server
const app = (0, express_1.default)();
const server = require("http").createServer(app);
const io = new socket_io_1.Server(server);
var connections = [];
var users = [];
//Detects new connection and executes content
io.on('connection', (socket) => {
    connections.push(socket);
    console.log('New socket: ' + connections.length + ' sockets connected.');
    //Prints msg on emit('message') in chat.js
    socket.on('message', (message) => {
        io.emit('messageFromServer', { message });
    });
    //On disconnect, print msg
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Socket disconnected: ' + connections.length + ' sockets connected.');
    });
});
//Shows index.html file as the default/home page
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', 'login.html'));
});
app.get('/index', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', 'index.html'));
});
//When localhost:3000/chat.js, locate and send chat.js file
app.get('/chat.js', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist', '/www', '/ts', 'chat.js'));
});
app.get('/login.js', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist', '/www', '/ts', 'login.js'));
});
app.use(express_1.default.json());
//Routers
app.use("/api/v1/users", user_1.default);
dotenv_1.default.config();
const PUERTO = process.env.PORT || 3000;
const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@hi-chat.iofmsjz.mongodb.net/?retryWrites=true&w=majority`;
const connectMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(url);
        console.log("Successfully connected to MongoDB");
    }
    catch (e) {
        console.log("Failed to connect to MongoDB: " + e);
    }
});
connectMongoDb();
server.listen(PUERTO, () => {
    console.log(`The server is listening on the port ${PUERTO}...`);
});
//# sourceMappingURL=index.js.map