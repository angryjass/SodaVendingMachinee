using System;
using System.Collections.Generic;

namespace SodaVendingMachine.Models
{
    public partial class Coins
    {
        public Coins()
        {
            CoinsStorage = new HashSet<CoinsStorage>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<CoinsStorage> CoinsStorage { get; set; }
    }
}
