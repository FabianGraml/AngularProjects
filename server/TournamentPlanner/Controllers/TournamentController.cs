using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentPlanner.DTOs;
using TournamentPlanner.Services;

namespace TournamentPlanner.Controllers
{
    [Route("api")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly TournamentService tournamentService;

        public TournamentController(TournamentService tournamentService)
        {
            this.tournamentService = tournamentService;


        }
        [HttpGet("persons")]
        public IActionResult GettAllPersons()
        {
            return Ok(tournamentService.GetAllPersons());
        }
        [HttpGet("genereateRound")]
        public IActionResult GenerateRound()
        {
            try
            {
                return Ok(tournamentService.GenerateMatches());
            } catch (ApplicationException)
            {
                return BadRequest("Match numbers is not correct!");
            }catch (IndexOutOfRangeException)
            {
                return BadRequest("There are still some games where no result is given");
            }

        }
        [HttpPost("setWinner")]
        public IActionResult SetMatchWinner(MatchWinnerDTO matchWinnerDTO)
        {
            return Ok(tournamentService.SetMatchWinner(matchWinnerDTO.MatchId, matchWinnerDTO.MatchWinnerId));
        }
        [HttpGet("getUnplayedMatch")]
        public IActionResult GetMatchesWithoutWinner()
        {
            return Ok(tournamentService.ReturnMatchesWithoutWinner());
        }
        [HttpGet("getRound/:round")]
        public IActionResult GetByRound(int round)
        {
            return Ok(tournamentService.GetRound(round));
        }
        [HttpDelete("resetMatchPlan")]
        public IActionResult ResetMatchPlan()
        {
            tournamentService.TruncateTableMatches();
            return NoContent();
        }
        [HttpPost("addPerson")]
        public IActionResult AddPerson([FromBody] PersonDTO personDTO)
        {
            tournamentService.AddClubMember(personDTO);
            return Ok();
        }
     

    }
}
