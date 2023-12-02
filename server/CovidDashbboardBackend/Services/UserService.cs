using CovidDashbboardBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CovidDashbboardBackend.Services;

public class UserService
{
    private readonly List<User> users = new List<User>
    {
        new User{Id = 1, Email = "fabian.graml@gmail.com", Firstname="Fabian", Lastname="Graml", Password="12345" },
    };
    public User Authenticate(string email, string password)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)) return null!;

        var user = users.SingleOrDefault(x => x.Email == email && x.Password == password);
        if (user == null) return null!;

        return password == user.Password ? user : null!;
    }
  
}

