using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto 
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,14}$",ErrorMessage="Password Must be 1 Cap, 1 Special, 1 small and 1 num at least 6 at max 14")]
        public string Password { get; set; }
    }
}