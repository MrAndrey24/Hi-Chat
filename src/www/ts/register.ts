namespace Register {

    const btnRegister = document.getElementById('btn-register');

    btnRegister?.addEventListener("click", async function() {
        const userName = (document.getElementById('inputUserName') as HTMLInputElement).value;
        const email = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const password = (document.getElementById('inputPassword') as HTMLInputElement).value;

        if(userName ==="" || email === "" || password === "") return alert("Please fill in all fields");

        if(password.length <= 5) return alert("Password must be at least 5 characters");

        let user = { name: userName, email: email, password: password};
        
        const response = await fetch('https://hi-chat.azurewebsites.net/api/v1/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if(response.ok) window.location.href = "https://hi-chat.azurewebsites.net/";

        if(!response.ok) alert("Something went wrong, please try again")
    });
}