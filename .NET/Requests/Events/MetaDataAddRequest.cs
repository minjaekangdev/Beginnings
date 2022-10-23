using Sabio.Models.Domain.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Events
{
    public class MetaDataAddRequest
    {
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public Location Location { get; set; }
    }
}
