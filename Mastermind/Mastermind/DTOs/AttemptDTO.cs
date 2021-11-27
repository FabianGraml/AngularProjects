using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mastermind.DTOs
{
    public class AttemptDTO
    {
        public string Msg { get; set; }
        public int GuessesLeft { get; set; }
    }
}
