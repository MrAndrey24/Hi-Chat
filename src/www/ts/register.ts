const socket = (window as any).io();

const btnRegister = document.getElementById('btn-register');

btnRegister?.addEventListener("click", async function() {
    const userName = (document.getElementById('inputUserName') as HTMLInputElement).value;
    const email = (document.getElementById('inputEmail') as HTMLInputElement).value;
    const password = (document.getElementById('inputPassword') as HTMLInputElement).value;

    let user = { name: userName, email: email, password: password};
    
    const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    if(response.ok) window.location.href = "http://localhost:3000/";

    if(!response.ok) throw new Error(`Error! status: ${response.status}`);
});

