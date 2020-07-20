using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any()){
                var user=new AppUser{
                    DisplayName="Bob",
                    Email="bob@email.com",
                    UserName="bob@email.com",
                    Address=new Address{
                        FirstName="Bob",
                        LastName="Doe",
                        Street="1 Evenue",
                        City="Dalas",
                        State="NY",
                        ZipCode="54321"
                    }
                };

                await userManager.CreateAsync(user,"P@ssw0rd");
            }
        } 
    }
}