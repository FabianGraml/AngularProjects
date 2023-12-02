using System;
using System.Collections.Generic;

namespace PersonsDb
{
    public partial class City
    {
        public City()
        {
            Adresses = new HashSet<Adress>();
        }

        public long Id { get; set; }
        public string? CountryCode { get; set; }
        public long PostalCode { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Adress> Adresses { get; set; }
    }
}
