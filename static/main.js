let socket;
let username;
let messages = [];


const loaded = () => {
    socket = io(`http://192.168.254.106:3000`);

    socket.on('connection', () => {
        console.log('a user is connected');
    });

    socket.on('messageToClient', (message) => {
        messages.push(message);
        addMessage(message);
    });

    socket.on('error', (err) => {
        console.error('Socket error : ', err);
    });
}

const setUser = () => {
    const uname = document.getElementById("inputUsername").value;
    if (!uname || uname.length == 0) {
        return;
    }
    username = uname;
    document.getElementById("userInfo").hidden = true;
    document.getElementById("chatbox").hidden = false;
    const message = {
        username,
        text: 'Joined in chat room....!!!'
    }
    socket.emit('messageToServer', message);
}

const logout = () => {
    username = null;
    messages = [];
    document.getElementById("chat-history").innerHTML = "";
}

const sendMessage = () => {
    const messageElement = document.getElementById("message");
    const message = {
        username,
        text: messageElement.value
    }
    socket.emit('messageToServer', message);
    messageElement.value = '';
}

const addMessage = (message) => {
    const newmessage = document.createElement("li");
    if (message.username === username) {
        newmessage.classList.add('msg-from-source');
    }
    newmessage.innerHTML = `<span>${message.username}</span> : ${message.text}`;
    document.getElementById("chat-history").append(newmessage);
}