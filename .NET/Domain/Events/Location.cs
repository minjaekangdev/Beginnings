using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Events
{
    public class Location
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string ZipCode { get; set; }
        public string Address { get; set; }
    }
}
