"use strict";
var MySocket;
(function (MySocket) {
    const socket = window.io();
    const email = document.querySelector("#inputEmail").value;
    const password = document.querySelector("#inputPassword").value;
    // login socket.io 
    socket.emit('login', { email, password });
})(MySocket || (MySocket = {}));
//# sourceMappingURL=login.js.map