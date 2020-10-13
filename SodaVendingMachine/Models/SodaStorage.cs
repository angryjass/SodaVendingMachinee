using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SodaVendingMachine.Models
{
    public partial class SodaStorage
    {
        public int Id { get; set; }
        public int SodaId { get; set; }
        public int? Value { get; set; }

        public virtual Soda Soda { get; set; }
    }
}
