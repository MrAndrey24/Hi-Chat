const socket = (window as any).io();

class Chat {
    static io : any;
    constructor(private cb : Function){
        socket.on('messageFromServer', this.cb);
    }
    emmitMessage(message : string){
        socket.emit('message', message);
    }
}

function messageReceived(response : any){
    let parent = document.querySelector("#messages");

    let child = document.createElement("li");

    child.innerHTML = response.message;
    parent?.appendChild(child);
}

let chat : Chat = new Chat(messageReceived);

document.querySelector("#form")?.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const message : string = (document.querySelector("#message") as HTMLInputElement).value;

    chat.emmitMessage(message);

    return false;
});