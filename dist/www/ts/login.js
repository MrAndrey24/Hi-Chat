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
var _a;
(_a = document.querySelector('#btn-login')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    const login = {
        email: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value
    };
    fetchLogin("http://localhost:3000/api/v1/users/login", login);
});
function fetchLogin(url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        //If request fails throw response status
        if (!response.ok)
            throw new Error(`Error! status: ${response.status}`);
        if (response.status === 200) {
            //Response from request
            const result = yield response.json();
            location.href = "http://localhost:3000/index?username=" + result.name;
        }
    });
}
//# sourceMappingURL=login.js.map