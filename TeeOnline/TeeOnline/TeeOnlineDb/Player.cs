using System;
using System.Collections.Generic;

namespace TeeOnlineDb
{
    public partial class Player
    {
        public Player()
        {
            Bookings = new HashSet<Booking>();
        }

        public long PlayerId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public double Handicap { get; set; }
        public long? HomeGolfClubGolfClubId { get; set; }

        public virtual GolfClub? HomeGolfClubGolfClub { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
