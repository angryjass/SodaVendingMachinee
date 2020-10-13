using System;
using System.Collections.Generic;

namespace SodaVendingMachine.Models
{
    public partial class CoinsStorageDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Value { get; set; }
        public bool IsLocked { get; set; }

    }
}