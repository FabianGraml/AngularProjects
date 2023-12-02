using CovidDashbboardBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace CovidDashbboardBackend.Controllers
{
    [Route("api")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDashboardService userDashboardService;

        public UserController(UserDashboardService userDashboardService)
        {
            this.userDashboardService = userDashboardService;
        }
        [AllowAnonymous]
        [HttpGet("cases")]
        public IActionResult GetCases()
        {
            return Ok(userDashboardService.GetCases());
        }
        [AllowAnonymous]
        [HttpGet("deaths")]
        public IActionResult GetDeaths()
        {
            return Ok(userDashboardService.GetDeaths());
        }
        [AllowAnonymous]
        [HttpGet("genderCases")]
        public IActionResult GetGenderCases()
        {
            return Ok(userDashboardService.GetGenderCases());
        }
        [HttpGet("intensiveCareAllTime")]
        public IActionResult GetHospitalizations()
        {
            return Ok(userDashboardService.GetIntensiveCareAllTime());
        }
        [HttpGet("intensiveCare")]
        public IActionResult GetIntensiveCare()
        {
            return Ok(userDashboardService.GetIntensiveCare());
        }
        [HttpGet("casesGKZ")]
        public IActionResult GetCasesGKZ()
        {
            return Ok(userDashboardService.GetCovidCasesGKZ());
        }


    }
}
