using Mastermind.DTOs;
using Mastermind.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mastermind.Controllers
{
    [Route("api")]
    [ApiController]
    public class MastermindController : ControllerBase
    {
        private readonly MastermindService mastermindService;
        public MastermindController(MastermindService mastermindService)
        {
            this.mastermindService = mastermindService;
        }
        [HttpGet("CreateGame/{guesses}")]
        public IActionResult CreateGame(int guesses)
        {
            return Ok(mastermindService.CreateGameBoard(guesses));
        }
        [HttpGet("GetGameBoards")]
        public IActionResult GetGameBoards()
        {
            return Ok(mastermindService.GetGameBoards());
        }
        [HttpGet("GetAllColors")]
        public IActionResult GetAllColors()
        {
            return Ok(mastermindService.GetAllColors());
        }
        [HttpPut("Guess")]
        public IActionResult UpdateGameoard([FromBody] GameBoardDTO gameBoardDTO)
        {
            return Ok(mastermindService.UpdateGameboard(gameBoardDTO));
        }
    }
}
