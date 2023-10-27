using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DeathlyHallowRace;
        }

        //public override Task OnConnectedAsync()
        //{
        //    Clients.All.SendAsync("updateDeathlyHallowsCount",
        //        GetRaceStatus()[SD.Cloak],
        //        GetRaceStatus()[SD.Stone],
        //        GetRaceStatus()[SD.Wand]);
        //    return base.OnConnectedAsync();
        //}


    }
}
