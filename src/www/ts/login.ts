namespace Login {
    const socket = (window as any).io();

    const email = (document.querySelector("#inputEmail") as HTMLInputElement).value;
    const password = (document.querySelector("#inputPassword") as HTMLInputElement).value;

    const btnLogin = document.getElementById('btn-login');

    // login socket.io 
    btnLogin?.addEventListener("click", async function() {
        const email = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const password = (document.getElementById('inputPassword') as HTMLInputElement).value;

        let user = { email: email, password: password};
        
        const response = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if(response.ok) window.location.href = "http://localhost:3000/www/index.html?username=" + email + "&room=default";

        if(!response.ok) throw new Error(`Error! status: ${response.status}`);
    });
}