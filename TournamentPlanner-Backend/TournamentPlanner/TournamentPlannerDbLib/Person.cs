using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TournamentPlannerDbLib
{
    public class Person
    {
        public int Id { get; set; }
        public string Firstname { get; set; } = string.Empty;
        public string Lastname { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;


        public override string ToString()
        {
            return Firstname + Lastname;
        }
        public class PersonEntityTypeConfiguration : IEntityTypeConfiguration<Person>
        {
            public void Configure(EntityTypeBuilder<Person> builder)
            {
                builder.HasKey(x => x.Id);
                var lines = File.ReadAllLines("C:\\Users\\Fabian\\Desktop\\TournamentPlanner\\TournamentPlannerDbLib\\csv\\players.csv").Skip(1);
                int i = 1;
                foreach(var line in lines)
                {
                    var split = line.Split(",");
                    builder.HasData(new Person { Id = i, Lastname = split[1], Firstname = split[0], Gender = split[2] });
                    i++;
                }
            }
        }
    }
}
