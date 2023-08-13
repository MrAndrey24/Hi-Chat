namespace MySocket {
    const socket = (window as any).io();

    const userMessage = (document.querySelector('#message') as HTMLInputElement);
    const printMessage = (document.querySelector('#messages') as HTMLLIElement);
    const btn = (document.querySelector('#sendMessage') as HTMLButtonElement);

    btn.addEventListener('click', () => {
        const message = userMessage.value;
        socket.emit('sendMessage', {
            message: userMessage.value.trim()
        })
    });

    socket.on('sendMessage', (message: string, user: string) => {
        printMessage.insertAdjacentHTML(
            'beforeend',
            `<li class="message"><b>${user}</b>: ${message}</li>`
        )
        printMessage.scrollTop = printMessage.scrollHeight;
    });
}