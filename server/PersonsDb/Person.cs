using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PersonsDb
{
    public partial class Person
    {
        public long Id { get; set; }
        [RegularExpression(@"^[A-Z][a-z]{2,}$", ErrorMessage = "Firstname error")]
        public string? Firstname { get; set; }
        [RegularExpression(@"^[A-Z]\w{2,}$", ErrorMessage = "Lastname error")]
        public string? Lastname { get; set; }
        [RegularExpression(@"^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$", ErrorMessage = "Date error (dd.MM.yyyy)")]
        public string Born { get; set; } = null!;
        [RegularExpression(@"\+\d{1,2} \(\d{2,3}\) \d{4,8}", ErrorMessage = "Tel. error +43 (01) 33444333")]
        public string? Tel { get; set; }
        public long AdressId { get; set; }
        public virtual Adress Adress { get; set; } = null!;
    }
}
