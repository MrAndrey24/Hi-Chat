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
var Login;
(function (Login) {
    const btnLogin = document.getElementById('btn-login');
    // login socket.io 
    btnLogin === null || btnLogin === void 0 ? void 0 : btnLogin.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const email = document.getElementById('inputEmail').value;
            const password = document.getElementById('inputPassword').value;
            let user = { email: email, password: password };
            const response = yield fetch('https://hi-chat.azurewebsites.net/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                const data = yield response.json();
                const username = data;
                window.location.href = "https://hi-chat.azurewebsites.net/index.html?username=" + username + "&room=default";
            }
            if (!response.ok)
                alert("Email or password incorrect");
        });
    });
})(Login || (Login = {}));
//# sourceMappingURL=login.js.map