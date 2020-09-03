const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;
const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));

loginForm.addEventListener('submit', function (event) {
    login(event);
});
addMessageForm.addEventListener('submit', function (event) {
    sendMessage(event);
});

function login(event) {
    event.preventDefault();
    
    if (userNameInput.value === '') {
        alert('This field should not be empty');
    } else {
        userName = userNameInput.value;
        socket.emit('user', { name: userName });
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    const messageHeader = document.createElement('h3');
    const messageBody = document.createElement('div');

    message.classList.add('message', 'message--received');
    messageHeader.classList.add('message__author');
    messageBody.classList.add('message__content');

    switch(author) {
        case userName: 
            message.classList.add('message--self');
            messageHeader.innerHTML = 'You';
            break;
        case 'Chat bot':     
            message.classList.add('message--bot');
            messageHeader.innerHTML = author;
            break;
        default:
            messageHeader.innerHTML = author;
    }

    messageBody.innerHTML = content;
    message.append(messageHeader, messageBody);
    messagesList.appendChild(message);

}

function sendMessage(event) {
    event.preventDefault();

    if(messageContentInput.value === '') {
        alert('This field should not be empty');
    } else {
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContentInput.value });
        messageContentInput.value = '';
    }
}


