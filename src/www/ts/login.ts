document.querySelector('#btn-login')?.addEventListener("click", function() {
    const login = {
        email: (document.getElementById('inputEmail') as HTMLInputElement).value,
        password: (document.getElementById('inputPassword') as HTMLInputElement).value
    };

    fetchLogin("http://localhost:3000/api/v1/users/login", login);
});

async function fetchLogin(url: string, body: any) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    //If request fails throw response status
    if(!response.ok) throw new Error(`Error! status: ${response.status}`);

    if(response.status === 200) {
        //Response from request
        const result = await response.json();
        location.href = "http://localhost:3000/index?username=" + result.name;
    }  
}