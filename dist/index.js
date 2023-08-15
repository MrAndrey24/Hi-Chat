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
const formatMessage = require("./www/ts/messages");
//Creating socket.io server
const app = (0, express_1.default)();
const server = require("http").createServer(app);
const io = new socket_io_1.Server(server);
const users = [];
const list_users = {};
//Detects new connection and executes content
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = { id: socket.id, username: username, room: room };
        users.push(user);
        socket.join(user.room);
        console.log('a user connected: ' + socket.id);
    });
    // login
    socket.on('login', ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const user = yield response.json();
                socket.emit('login', { user });
            }
            const error = yield response.json();
            socket.emit('login', { error });
        }
        catch (error) {
            console.log(error);
        }
    }));
    //Prints msg on emit('message') in chat.js
    socket.on('chatMessage', (msg) => {
        const user = users.find((user) => user.id === socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
    // Prints desconnection users on console
    socket.on('disconnect', () => {
        delete list_users[socket.id];
        io.emit('activeSessions', list_users);
        console.log('user disconnected: ' + socket.id);
    });
});
app.use(express_1.default.static(__dirname));
//Shows index.html file as the default/home page
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', 'login.html'));
});
//When localhost:3000/chat.js, locate and send chat.js file
app.get('/chat.js', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist', '/www', '/ts', 'chat.js'));
});
app.get('/login.js', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist', '/www', '/ts', 'login.js'));
});
app.get('/register.js', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../dist', '/www', '/ts', 'register.js'));
});
app.get('/index.html', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', 'index.html'));
});
// When localhost:3000/chat, locate and send html files to the client
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', 'login.html'));
});
app.get('/www/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', 'register.html'));
});
app.get('/index.css', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', '/css', 'index.css'));
});
app.get('/login.css', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', '/css', 'login.css'));
});
app.get('/register.css', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../src', '/www', '/css', 'register.css'));
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