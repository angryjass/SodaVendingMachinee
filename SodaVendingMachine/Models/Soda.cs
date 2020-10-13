using System;
using System.Collections.Generic;

namespace SodaVendingMachine.Models
{
    public partial class Soda
    {
        public Soda()
        {
            SodaStorage = new HashSet<SodaStorage>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public double? Price { get; set; }
        public string Img { get; set; }

        public virtual ICollection<SodaStorage> SodaStorage { get; set; }
    }
}
