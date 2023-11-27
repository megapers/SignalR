var sendMessage = document.getElementById("sendMessage");
var messagesList = document.getElementById("messagesList");

//create connection
var connectionChat = new signalR.HubConnectionBuilder().withUrl("/hubs/basicChat").build();

sendMessage.disabled = true;

connectionChat.on("MessageReceived", (user, message) => {
    console.log(user, message);
    var li = document.createElement("li");
    messagesList.appendChild(li);
    li.textContent = `${user} - ${message}`;

});

sendMessage.addEventListener("click", (event) => {
    var senderEmail = document.getElementById("senderEmail").value;
    var receiverEmail = document.getElementById("receiverEmail").value;
    var chatMessage = document.getElementById("chatMessage").value;

    if (receiverEmail.length > 0) {
        connectionChat.send("SendMessageToReceiver", senderEmail, receiverEmail, chatMessage).catch(err => {
            return console.error(err.toString());
        });
    }
    else {

        //send message to all users
        connectionChat.send("SendMessageToAll", senderEmail, chatMessage)
            .catch((err) => { return console.error(err.toString()) });
    }

    event.preventDefault();
});

connectionChat.start().then(() => {
    console.log("Connected!!!");
    sendMessage.disabled = false;
});