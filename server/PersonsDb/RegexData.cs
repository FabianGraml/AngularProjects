using System;
using System.Collections.Generic;

namespace PersonsDb
{
    public partial class RegexData
    {
        public long Id { get; set; }
        public string CountryCode { get; set; } = null!;
        public string? Email { get; set; }
    }
}
