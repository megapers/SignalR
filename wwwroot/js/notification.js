
let notificationInput = document.getElementById("notificationInput");

let sendButton = document.getElementById("sendButton");
let notificationCounter = document.getElementById("notificationCounter");
let messageList = document.getElementById("messageList");
let navbarDropdown = document.getElementById("navbarDropdown");


//create connection
var connectionNotification = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/notificationHub").build();

//connect to methods that hub invokes aka receive notifications from hub

sendButton.addEventListener("click", function (event) {
    const message = notificationInput.value;
    notificationInput.value = '';
    connectionNotification.invoke("AddMessage", message).then(value => {
        notificationCounter.innerHTML = value;
    });

    event.preventDefault();
});

navbarDropdown.addEventListener("click", function (event) {

    if (navbarDropdown.getAttribute("aria-expanded") === "true") {
        // The "aria-expanded" attribute is equal to "true"
        console.log("aria-expanded is true");
    } else {
        // The "aria-expanded" attribute is not equal to "true"
        console.log("aria-expanded is false");
    }


    event.preventDefault();
});



//invoke hub methods aka send notification to hub


//start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
}

function rejected() {

}

connectionNotification.start().then(fulfilled, rejected);
