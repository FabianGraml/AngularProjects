using Persons.DTOs;
using Persons.Services;

namespace Persons.Controllers;

[Route("api")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly PersonService personService;
    public PersonController(PersonService personService)
    {
        this.personService = personService;
    }

    [HttpGet("Persons")]
    public IActionResult GetPersons()
    {
        return Ok(personService.GetPersons());
    }
    [HttpGet("Persons/{id}")]
    public IActionResult GetPersonById(int id)
    {
        return Ok(personService.GetPersonsById(id));
    }
    [HttpPost("Persons")]
    public IActionResult AddPerson([FromBody] PersonDTO personDTO)
    {
        return Created("", personService.AddPerson(personDTO));
    }

}