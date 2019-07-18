using System;
using System.Collections.Generic;

namespace TalentOnboardingTaskMadhu.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
