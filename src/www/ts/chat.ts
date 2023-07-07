const socket = (window as any).io();

class Chat {
    static io : any;
    constructor(private cb : Function){}
    emmitMessage(message : string){
        socket.emit('message', message);
    }
}

function messageReceived(_response : any){}

let chat : Chat = new Chat(messageReceived);

chat.emmitMessage('Hola');