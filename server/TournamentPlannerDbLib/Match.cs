using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TournamentPlannerDbLib
{
    public class Match
    {
        public int Id { get; set; }
        public int Round { get; set; }
        public Person Person1 { get; set; }
        public Person Person2 { get; set; }
        public Person Winner { get; set; }
  

        public class MatchEntityTypeConfiguration : IEntityTypeConfiguration<Match>
        {
            public void Configure(EntityTypeBuilder<Match> builder)
            {
                builder.HasKey(x => x.Id); 
            }
        }

    }
}
