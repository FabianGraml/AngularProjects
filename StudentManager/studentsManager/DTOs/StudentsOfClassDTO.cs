using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace studentsManager.DTOs
{
    public class StudentsOfClassDTO
    {
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        public long? ClazzId { get; set; }
        public string Clazzname { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public long Age { get; set; }
        public long Registered { get; set; }



    }
}
