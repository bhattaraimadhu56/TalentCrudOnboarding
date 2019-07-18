using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TalentOnboardingTaskMadhu.Models
{
    public partial class Stores
    {
        public Stores()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Display(Name = "Store Price")]
        [Required]
        public string StoreName { get; set; }

        [Display(Name = "Store Address")]
        [Required]
        public string StoreAddress { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
