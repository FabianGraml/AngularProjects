using Mastermind.DTOs;
using Mastermind.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mastermind.Services
{
    public class MastermindService
    {

        private static readonly List<string> colors = new List<string> { "Yellow", "Red", "Blue", "Green", "Magenta", "White", "Brown", "Black" };
        private static List<Gameboard> gameboards = new List<Gameboard>();

        public MastermindService()
        {
        }

        public Gameboard CreateGameBoard(int guesses)
        {
            var random = new Random();
           
            var randomColors = new List<string>();
            for (int i = 0; i < 4; i++)
            {
                randomColors.Add(colors[random.Next(0, colors.Count() - 1)]);
            }
            Console.WriteLine(randomColors);
            var gameboard = new Gameboard()
            {
                Id = GenerateRandomId(),
                Colors = randomColors,
                Guesses = guesses,
                Round = 1,
            };
            gameboards.Add(gameboard);

            return gameboard;
        }
        public List<string> GetAllColors()
        {
            return colors.ToList();
        }
        public List<Gameboard> GetGameBoards()
        {
          
            return gameboards.ToList();
        }

        public AttemptDTO UpdateGameboard(GameBoardDTO gameboardDTO)
        {
            
            var gameboard = gameboards.Where(x => x.Id == gameboardDTO.Id).First();
            var guessesLeft = gameboards.Where(x => x.Id == gameboardDTO.Id).First().Guesses - 1;

            gameboards.Where(x => x.Id == gameboardDTO.Id).First().Guesses = guessesLeft ;
            
            if (CountSamePositionAndValue(gameboard.Colors, gameboardDTO.Colors) == 4)
            {
                return new AttemptDTO() { Msg = "You won!", GuessesLeft = guessesLeft };
            } else if (guessesLeft == 0) {
                return new AttemptDTO() { Msg = "You Lost!", GuessesLeft=0 };
            }
            else
            {
                int numberOfCorrectPositions = 0;
                if (CountSamePositionAndValue(gameboard.Colors, gameboardDTO.Colors) >= 1)
                {
                    numberOfCorrectPositions = 1;
                }
                return new AttemptDTO() { Msg = $"Already right colors: { CountSameElements(gameboardDTO.Colors, gameboard.Colors)}\n At least { numberOfCorrectPositions} color in the right position", GuessesLeft = guessesLeft};

                
                }
        }
        private string GenerateRandomId()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[6];
            var random = new Random();
            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            var finalString = new String(stringChars);
            return finalString;
        }
        private int CountSameElements(List<string> actualList, List<string> guessList)
        {
           return actualList.Intersect(guessList).Count();
        }
        private int CountSamePositionAndValue(List<string> list1, List<string> list2)
        {
            int count = 0;
            for (int i = 0; i < list1.Count; i++)
            {
                if (list1[i] == list2[i])
                {
                    count++;
                }
            }
            return count;
        }
    }
}
