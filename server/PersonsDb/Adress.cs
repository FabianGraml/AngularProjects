using System;
using System.Collections.Generic;

namespace PersonsDb
{
    public partial class Adress
    {
        public Adress()
        {
            People = new HashSet<Person>();
        }

        public long Id { get; set; }
        public string? StreetName { get; set; }
        public long StreetNr { get; set; }
        public long? CityId { get; set; }

        public virtual City? City { get; set; }
        public virtual ICollection<Person> People { get; set; }
    }
}
