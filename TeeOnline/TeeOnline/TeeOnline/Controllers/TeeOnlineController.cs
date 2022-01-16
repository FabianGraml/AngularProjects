using TeeOnline.DTOs;
using TeeOnline.Exceptions;

namespace TeeOnline.Controllers;

[Route("api")]
[ApiController]
public class TeeOnlineController : ControllerBase
{
    private readonly TeeOnlineService teeOnlineService;
    public TeeOnlineController(TeeOnlineService teeOnlineService)
    {
        this.teeOnlineService = teeOnlineService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] PlayerLoginDTO playerLoginDTO)
    {
        return Ok(teeOnlineService.Login(playerLoginDTO));
    }
    [HttpGet("golfclubs")]
    public IActionResult GetGolfClubs()
    {
        return Ok(teeOnlineService.GetGolfClubs());
    }
    [HttpGet("players")]
    public IActionResult GetPlayers()
    {
        return Ok(teeOnlineService.GetPlayers());
    }
    [HttpPost("booking")]
    public IActionResult AddBooking([FromBody] BookinRequestDTO bookinRequestDTO)
    {
        try
        {
            return Ok(teeOnlineService.AddBooking(bookinRequestDTO));
        } catch (NoPlayerException)
        {
            return NotFound("Could not find players in the Database");
        }
        catch (NoFreeSlotException)
        {
            return BadRequest("No free slot at this time and this Golfclub");
        }
        catch (TooMuchPlayersException)
        {
            return BadRequest("Too much players for this time and this Golfclub");
        }
    }
    [HttpGet("booking")]
    public IActionResult GetBooking([FromQuery] int golfClubId, string date, int hours, int minutes)
    {
        try
        {
            return Ok(teeOnlineService.GetBooking(golfClubId, date, hours, minutes));
        }
        catch (Exception)
        {
            return NotFound("No Booking Found with given params!");
        }
    }

}

