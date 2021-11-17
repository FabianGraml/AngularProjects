using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentPlanner.DTOs;
using TournamentPlannerDbLib;

namespace TournamentPlanner.Services
{
    public class TournamentService
    {
        private readonly TournamentContext db;
        public TournamentService(TournamentContext db)
        {
            this.db = db;
        }

        public List<Person> GetAllPersons()
        {
            return db.Persons.ToList();
        }

        public Match SetMatchWinner(int matchId, int matchWinnerId)
        {
            var match = db.Matches.SingleOrDefault(x => x.Id == matchId);
            match.Person1 = match.Person1;
            match.Person2 = match.Person2;
            match.Round = match.Round;
            match.Id = match.Id;
            match.Winner = db.Persons.FirstOrDefault(x => x.Id == matchWinnerId);
            db.SaveChanges();
            return match;
        }

        public List<Match> GenerateMatches()
        {
            var matches = db.Matches.ToList();
            if (matches.Count() == 0)
            {
                int round = 1;
                GenerateFirstRound();
                return db.Matches.Where(x => x.Round == round).ToList();
            }
            else if (matches.Count() == 16)
            {
                int round = 2;
                GenereateNextRound(round, 16);
                return db.Matches.Where(x => x.Round == round).ToList();
            }
            else if (matches.Count() == 24)
            {
                int round = 3;
                GenereateNextRound(round, 24);
                return db.Matches.Where(x => x.Round == round).ToList();
            }
            else if (matches.Count() == 28)
            {
                int round = 4;
                GenereateNextRound(round, 28);
                return db.Matches.Where(x => x.Round == round).ToList();
            }
            else if (matches.Count() == 30)
            {
                int round = 5;
                GenereateNextRound(round, 30);
                return db.Matches.Where(x => x.Round == round).ToList();
            }
            else
            {
                throw new ApplicationException();
            }
        }
        public List<Match> ReturnMatchesWithoutWinner()
        {
            return db.Matches.Include(x => x.Person1).Include(x => x.Person2).Where(x => x.Winner == null).ToList();
        }
        public List<Match> GetRound(int round)
        {
            return db.Matches.Include(x => x.Person1).Include(x => x.Person2).Include(x => x.Winner).Where(x => x.Round == round).ToList();
        }
        public void TruncateTableMatches()
        {
            db.Matches.RemoveRange(db.Matches);
            db.SaveChanges();
        }

        private void GenereateNextRound(int round, int noMatches)
        {
            if (db.Matches.Where(x => x.Winner != null).Count() == noMatches)
            {

                var winnersOfPreviousRound = db.Matches.Where(x => x.Round == round - 1).Select(x => x.Winner).ToList();
                Random random = new Random();
                while (winnersOfPreviousRound.Count() != 0)
                {
                    var rand1 = random.Next(winnersOfPreviousRound.Count());
                    var firstPlayer = winnersOfPreviousRound[rand1];
                    winnersOfPreviousRound.RemoveAt(rand1);
                    var rand2 = random.Next(winnersOfPreviousRound.Count());
                    var secondPlayer = winnersOfPreviousRound[rand2];
                    winnersOfPreviousRound.RemoveAt(rand2);

                    db.Matches.Add(new Match() { Person1 = firstPlayer, Person2 = secondPlayer, Round = round });
                }
                db.SaveChanges();
            }
            else
            {
                throw new IndexOutOfRangeException();
            }
        }
        private void GenerateFirstRound()
        {
            Random rand = new Random();
            var persons = db.Persons.ToList().OrderBy(x => rand.Next()).Take(32).ToList();


            Random random = new Random();
            while (persons.Count() != 0)
            {
                var rand1 = random.Next(persons.Count());
                var firstPlayer = persons[rand1];
                persons.RemoveAt(rand1);
                var rand2 = random.Next(persons.Count());
                var secondPlayer = persons[rand2];
                persons.RemoveAt(rand2);
                db.Matches.Add(new Match() { Person1 = firstPlayer, Person2 = secondPlayer, Round = 1 });
            }
            db.SaveChanges();
        }
        public void AddClubMember(PersonDTO personDTO)
        {
            var person = new Person
            {
                Firstname = personDTO.Firstname,
                Lastname = personDTO.Lastname,
                Gender = personDTO.Gender
            };
            db.Persons.Add(person);
            db.SaveChanges();
        }
    }
}
