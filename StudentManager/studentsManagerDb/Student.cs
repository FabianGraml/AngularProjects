using System;
using System.Collections.Generic;

#nullable disable

namespace studentsManagerDb
{
    public partial class Student
    {
        public long Id { get; set; }
        public string Gender { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public long Age { get; set; }
        public long Registered { get; set; }
        public long? ClazzId { get; set; }

        public virtual Clazz Clazz { get; set; }
    }
}
