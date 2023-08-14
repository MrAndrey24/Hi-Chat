"use strict";
const socket = window.io();
const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.getElementById('form');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const room = urlParams.get('room');
socket.emit('joinRoom', { username, room });
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
});
chatForm === null || chatForm === void 0 ? void 0 : chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('msg');
    socket.emit('chatMessage', msg.value);
    msg.value = '';
    msg.focus();
});
function outputMessage(message) {
    var _a;
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p><strong>${message.username}<strong/> ${message.time}</p>
                     <p class="text"> ${message.text} </p>`;
    (_a = document.querySelector('.chat-messages')) === null || _a === void 0 ? void 0 : _a.appendChild(div);
}
//# sourceMappingURL=chat.js.map