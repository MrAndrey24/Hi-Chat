namespace MySocket {
    const socket = (window as any).io();

    const email = (document.querySelector("#inputEmail") as HTMLInputElement).value;
    const password = (document.querySelector("#inputPassword") as HTMLInputElement).value;

    // login socket.io 
    socket.emit('login', { email, password })
}