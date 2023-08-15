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
var Register;
(function (Register) {
    const btnRegister = document.getElementById('btn-register');
    btnRegister === null || btnRegister === void 0 ? void 0 : btnRegister.addEventListener("click", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const userName = document.getElementById('inputUserName').value;
            const email = document.getElementById('inputEmail').value;
            const password = document.getElementById('inputPassword').value;
            if (userName === "" || email === "" || password === "")
                return alert("Please fill in all fields");
            if (password.length <= 5)
                return alert("Password must be at least 5 characters");
            let user = { name: userName, email: email, password: password };
            const response = yield fetch('https://hi-chat.azurewebsites.net/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            if (response.ok)
                window.location.href = "https://hi-chat.azurewebsites.net/";
            if (!response.ok)
                alert("Something went wrong, please try again");
        });
    });
})(Register || (Register = {}));
//# sourceMappingURL=register.js.map