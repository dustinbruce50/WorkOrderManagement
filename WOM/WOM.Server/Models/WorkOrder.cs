using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WOM.Server.Models{
    public class WorkOrder{
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}
        public int CostCenter {get; set;}

        public string Title {get; set;} = null!;

        public string Description {get; set;} = null!;

        public DateTime Created {get; set;}
        public DateTime? Completed {get; set;}

        public string? Status {get; set;}

        public int Priority{get;set;}
    }
}