const socket = (window as any).io();

const chatMessages = document.querySelector('.chat-messages');

const chatForm = document.getElementById('form');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const room = urlParams.get('room');

socket.emit('joinRoom', { username, room});

socket.on('message', (message : string) => {
    console.log(message);
    outputMessage(message);
});

chatForm?.addEventListener('submit', e => {
    e.preventDefault();

    const msg = document.getElementById('msg') as HTMLInputElement;

    socket.emit('chatMessage', msg.value);

    msg.value = '';
    msg.focus();
});

function outputMessage(message : any) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p><strong>${message.username}<strong/> ${message.time}</p>
                     <p class="text"> ${message.text} </p>`;

    document.querySelector('.chat-messages')?.appendChild(div);
}