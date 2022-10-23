using Sabio.Models.Domain.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Events
{
    public class EventAddRequest
    {
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public string Slug { get; set; }
        public int StatusId { get; set; }
        public MetaDataAddRequest MetaData { get; set; }
    }
}
