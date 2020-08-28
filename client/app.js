const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

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

    if (author === userName) {
        message.classList.add('message--self');
        messageHeader.innerHTML = 'You';
    } else {
        messageHeader.innerHTML = author;
    }

    message.append(messageHeader, messageBody);
    messageBody.innerHTML = content;
    messagesList.appendChild(message);

}

function sendMessage(event) {
    event.preventDefault();

    if(messageContentInput.value === '') {
        alert('This field should not be empty');
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    }
}


