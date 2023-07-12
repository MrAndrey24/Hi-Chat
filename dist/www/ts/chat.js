"use strict";
var _a;
const socket = window.io();
class Chat {
    constructor(cb) {
        this.cb = cb;
        socket.on('messageFromServer', this.cb);
    }
    emmitMessage(message) {
        socket.emit('message', message);
    }
}
function messageReceived(response) {
    let parent = document.querySelector("#messages");
    let child = document.createElement("li");
    child.innerHTML = response.message;
    parent === null || parent === void 0 ? void 0 : parent.appendChild(child);
}
let chat = new Chat(messageReceived);
(_a = document.querySelector("#form")) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const message = document.querySelector("#message").value;
    chat.emmitMessage(message);
    return false;
});
//# sourceMappingURL=chat.js.map