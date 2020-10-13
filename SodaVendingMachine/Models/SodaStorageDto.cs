using System;
using System.Collections.Generic;

namespace SodaVendingMachine.Models
{
    public partial class SodaStorageDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Price { get; set; }
        public string Img { get; set; }
        public int? Value { get; set; }
    }
}
