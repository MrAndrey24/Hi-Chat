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
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    let parent = document.querySelector("#messages");

    let child = document.createElement("li");

    //TODO: Fix usernames on message display

    child.innerHTML = "<strong>" + urlParams.get('username') + ": </strong>" + response.message;
    parent?.appendChild(child);
}

let chat : Chat = new Chat(messageReceived);

document.querySelector("#form")?.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const message : string = (document.querySelector("#message") as HTMLInputElement).value;

    chat.emmitMessage(message);

    return false;
});