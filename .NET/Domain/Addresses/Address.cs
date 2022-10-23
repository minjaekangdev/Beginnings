using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Addresses
{
    public class Address : BaseAddress
    {
        //for data coming from the database
        public bool IsActive { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
    }
}
