using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mastermind.Models
{
    public class Gameboard
    {
        public string Id { get; set; }
        public int Round { get; set; }
        public int Guesses { get; set; }

        public List<string> Colors { get; set; }
    }
}
