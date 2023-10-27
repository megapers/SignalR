using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> Messages { get; set; } = new List<string>();

        public int AddMessage(string message)
        {
            Messages.Add(message);

            return Messages.Count;
        }

        public List<string> GetMessages() { return Messages;}

    }
}
