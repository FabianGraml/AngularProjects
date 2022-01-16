using System;
using System.Collections.Generic;

namespace TeeOnlineDb
{
    public partial class Booking
    {
        public Booking()
        {
            Players = new HashSet<Player>();
        }

        public long BookingId { get; set; }
        public string DateTime { get; set; } = null!;
        public long  IsLocked { get; set; }
        public long? GolfClubId { get; set; }
        public virtual GolfClub? GolfClub { get; set; }
        public virtual ICollection<Player> Players { get; set; }
    }
}
