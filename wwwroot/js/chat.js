var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat")
    .withAutomaticReconnect([0, 1000, 5000, null])
    .build();

connection.on("ReceiveUserConnected", function (userId, userName){
    addMessage(`${userName} is online`);
});

function addMessage(msg) {
    if (msg == null && msg == '') {
        return;
    }
    let ul = document.getElementById("messagesList");
    let li = document.createElement("li");
    li.innerHTML = msg;
    ul.appendChild(li);
}


connection.start();