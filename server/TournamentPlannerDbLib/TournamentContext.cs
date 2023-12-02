using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TournamentPlannerDbLib
{
    public class TournamentContext : DbContext
    {
        public TournamentContext() {}
        public TournamentContext(DbContextOptions<TournamentContext>  options) : base (options)  {}
       
        
        public DbSet<Match> Matches { get; set; }
        public DbSet<Person> Persons { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {    
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
                optionsBuilder.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"]);
            }
            base.OnConfiguring(optionsBuilder);
        }
    }
    }

