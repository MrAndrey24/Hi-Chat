"use strict";
var MySocket;
(function (MySocket) {
    const socket = window.io();
    const userMessage = document.querySelector('#message');
    const printMessage = document.querySelector('#messages');
    const btn = document.querySelector('#sendMessage');
    btn.addEventListener('click', () => {
        const message = userMessage.value;
        socket.emit('sendMessage', {
            message: userMessage.value.trim()
        });
    });
    socket.on('sendMessage', (message, user) => {
        printMessage.insertAdjacentHTML('beforeend', `<li class="message"><b>${user}</b>: ${message}</li>`);
        printMessage.scrollTop = printMessage.scrollHeight;
    });
})(MySocket || (MySocket = {}));
//# sourceMappingURL=chat.js.map