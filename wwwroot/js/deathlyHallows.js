var cloakCountSpan = document.getElementById("cloakCounter");
var stoneCountSpan = document.getElementById("stoneCounter");
var wandCountSpan = document.getElementById("wandCounter");

//create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyHallows").build();

//connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakCountSpan.innerText = cloak.toString();
    stoneCountSpan.innerText = stone.toString();
    wandCountSpan.innerText = wand.toString();
});

//invoke hub methods aka send notification to hub


//start connection
function fulfilled() {
    connectionDeathlyHallows.invoke("GetRaceStatus").then(raceCounter => {
        cloakCountSpan.innerText = raceCounter.cloak.toString();
        stoneCountSpan.innerText = raceCounter.stone.toString();
        wandCountSpan.innerText = raceCounter.wand.toString();
    });
    console.log("Connection to User Hub Successful");
}

function rejected() {

}

connectionDeathlyHallows.start().then(fulfilled, rejected);

