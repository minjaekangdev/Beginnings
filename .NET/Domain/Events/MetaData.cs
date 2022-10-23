using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Events
{
    public class MetaData
    {
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public List<Location> Location { get; set; }
    }
}
