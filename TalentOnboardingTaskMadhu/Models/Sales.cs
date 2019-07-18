using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TalentOnboardingTaskMadhu.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public int StoreId { get; set; }

        [Display(Name = "Date Sold")]
        [Required]
        public DateTime DateSold { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Products Product { get; set; }
        public virtual Stores Store { get; set; }
    }
}
