namespace Login {

    const btnLogin = document.getElementById('btn-login');

    // login socket.io 
    btnLogin?.addEventListener("click", async function() {
        const email = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const password = (document.getElementById('inputPassword') as HTMLInputElement).value;

        let user = { email: email, password: password};
        
        const response = await fetch('https://hi-chat.azurewebsites.net/api/v1/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if(response.ok) window.location.href = "https://hi-chat.azurewebsites.net/www/index.html?username=" + username + "&room=default";

        if(!response.ok) alert("Email or password incorrect")
    });
}