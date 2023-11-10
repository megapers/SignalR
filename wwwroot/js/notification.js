
let notificationInput = document.getElementById("notificationInput");

let sendButton = document.getElementById("sendButton");
let notificationCounter = document.getElementById("notificationCounter");
let messageList = document.getElementById("messageList");
let navbarDropdown = document.getElementById("navbarDropdown");


//create connection
var connectionNotification = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/notificationHub").build();

sendButton.disabled = true;

//connect to methods that hub invokes aka receive notifications from hub
connectionNotification.on("LoadNotification", (messages, counter) => {
    messageList.innerHTML = "";
    notificationCounter.innerHTML = "<span>(" + counter + ")</span>";

    for (let i = messages.length - 1; i >= 0; i--) {
        var li = document.createElement("li");
        li.textContent = "Notification - " + messages[i];
        messageList.appendChild(li);
    }
});

sendButton.addEventListener("click", (event) => {
    const message = notificationInput.value;
   
    if (message !== null && message.trim() !== "") {
        connectionNotification.send("SendMessage", message).then(() => {
            notificationInput.value = '';
        });
    };

    event.preventDefault();
});

//start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
    sendButton.disabled = false;
}

connectionNotification.start().then(fulfilled);
