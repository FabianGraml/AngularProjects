using Persons.DTOs;
using PersonsDb;

namespace Persons.Services
{
    public class PersonService
    {
        private readonly PersonsContext db;
        public PersonService(PersonsContext db)
        {
            this.db = db;
        }
        public List<PersonReplyDTO> GetPersons()
        {
            var persons = db.Persons.Include(x => x.Adress).Include(x => x.Adress.City).ToList();
            var personList = new List<PersonReplyDTO>();
            foreach (var person in persons)
                personList.Add(new PersonReplyDTO
                {
                    Firstname = person.Firstname,
                    Lastname = person.Lastname,
                    Born = person.Born,
                    Tel = person.Tel,
                    AddressString = $"{person.Adress?.City?.CountryCode}-{person.Adress?.City?.PostalCode} {person.Adress?.City?.Name}, {person.Adress?.StreetName} {person.Adress?.StreetNr}"
                });
            return personList;
        }
        public PersonReplyDTO GetPersonsById(int id)
        {
            var person = db.Persons.Where(x => x.Id == id).Include(x => x.Adress).Include(x => x.Adress.City).First();
            return new PersonReplyDTO
            {
                Firstname = person.Firstname,
                Lastname = person.Lastname,
                Born = person.Born,
                Tel = person.Tel,
                AddressString = $"{person.Adress?.City?.CountryCode}-{person.Adress?.City?.PostalCode} {person.Adress?.City?.Name}, {person.Adress?.StreetName} {person.Adress?.StreetNr}"
            };
        }
        public Person AddPerson(PersonDTO personDTO)
        {
            var person = new Person
            {
                Firstname = personDTO.Firstname,
                Lastname = personDTO.Lastname,
                Tel = personDTO.Tel,
                Born = personDTO.Born,
                Adress = personDTO.Address,
            };

            db.Persons.Add(person);
            db.SaveChanges();
            return person;
        }
    }
}
