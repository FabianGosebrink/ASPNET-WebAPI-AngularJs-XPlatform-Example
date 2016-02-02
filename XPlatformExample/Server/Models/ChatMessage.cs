using System;

namespace XPlatformExample.Server.Models
{
    public class ChatMessage
    {
        public string Username { get; set; }
        public string Text { get; set; }
        public DateTime SentAt { get; set; }
    }
}
