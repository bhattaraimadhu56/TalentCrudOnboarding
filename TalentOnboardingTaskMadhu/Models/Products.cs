using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TalentOnboardingTaskMadhu.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Display(Name = "Product Name")]
        [Required]
        public string ProductName { get; set; }


        [Display(Name = "Product Price")]
        [Required]
        public decimal Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
