using System;
using System.Collections.Generic;

namespace TeeOnlineDb
{
    public partial class GolfClub
    {
        public GolfClub()
        {
            Bookings = new HashSet<Booking>();
            Players = new HashSet<Player>();
        }

        public long GolfClubId { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<Player> Players { get; set; }
    }
}
