using System;
using System.Collections.Generic;

namespace SodaVendingMachine.Models
{
    public partial class CoinsStorage
    {
        public int Id { get; set; }
        public int CoinId { get; set; }
        public int? Value { get; set; }
        public bool IsLocked { get; set; }

        public virtual Coins Coin { get; set; }
    }
}
