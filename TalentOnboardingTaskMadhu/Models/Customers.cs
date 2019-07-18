using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TalentOnboardingTaskMadhu.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Display(Name = "Customer Name")]
        [Required]
        public string CustomerName { get; set; }

        [Display(Name = "Customer Address")]
        [Required]
        public string CustomerAddress { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
