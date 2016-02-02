using System.Diagnostics;
using Microsoft.AspNet.SignalR;
using XPlatformExample.Server.Models;

namespace XPlatformExample.Server.Hubs
{
    public class ChatHub : Hub
    {
        public ChatHub()
        {
            Debug.WriteLine("in Chathub");
        }

        public void Send(ChatMessage message)
        {
            Clients.All.addMessage(message);
        }
    }
}