using System.ComponentModel.DataAnnotations;

namespace WOM.Server.Models{
    public class User{
        public int Id {get; set;}
        [Required]
        public string? Username {get; set;}
        [Required]
        public string? Password {get; set;}

        [Required]
        public int CostCenter {get; set;}

    }
}