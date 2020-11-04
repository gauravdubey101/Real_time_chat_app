const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('piece-of-cake-611');


const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
    

}
//if the form gets submiited , send sever the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})

//ASk new user for his/her name and let the server know 
const name=prompt("Enter you name to join");
socket.emit('new-user-joined',name);

//if a new user joins , recives his her name from the server
socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right');
});

//if the server send data recive it 
    socket.on('receive',data =>{
        append(`${data.name}:${data.message}`,'left');

    
});
//if user user leave the chat append the info to the container
socket.on('left',data =>{
    append(`${name} left the chat`,'left');


});

