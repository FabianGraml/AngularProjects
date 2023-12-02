using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace Persons.DTOs;

public class PersonDTO
{

    [Required]
    [RegularExpression(@"^[A-Z][a-z]{2,}$")]
    public string? Firstname { get; set; }
    [Required]
    [RegularExpression(@"^[A-Z]\w{2,}$")]
    public string? Lastname { get; set; }
    [Required]
    [RegularExpression(@"^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$")]
    public string Born { get; set; } = null!;
    [Required]
    [RegularExpression(@"\+\d{1,2} \(\d{2,3}\) \d{4,8}")]
    public string? Tel { get; set; }
    [Required]
    [RegularExpression(@"^(?<CountryCode>[A-Z]{1,2})\-(?<PostalCode>\d{4,5})\s(?<City>\w*),\s(?<Street>\w*)\s(?<HouseNr>\d+)$")]
    public string? AddressString { get; set; }

    [JsonIgnore]
    public Adress Address
    {
        get
        {
            Match m = Regex.Match(AddressString!, @"^(?<CountryCode>[A-Z]{1,2})\-(?<PostalCode>\d{4,5})\s(?<City>\w*),\s(?<StreetName>\w*)\s(?<StreetNr>\d+)$");
            Group streetNr = m.Groups["StreetNr"];
            Group streetName = m.Groups["StreetName"];
            Group countryCode = m.Groups["CountryCode"];
            Group postalCode = m.Groups["PostalCode"];
            Group city = m.Groups["City"];

            return new Adress()
            {
                City = new City
                {
                    CountryCode = countryCode.Value,
                    PostalCode = int.Parse(postalCode.Value),
                    Name = city.Value,

                },
                StreetName = streetName.Value,
                StreetNr = int.Parse(streetNr.Value),

            };
        }
    }

}

