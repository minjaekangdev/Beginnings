using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Images;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TechCos
{
    public class TechCoAddRequest
    {
        public string Name { get; set; }
        public string Profile { get; set; }
        public string Summary { get; set; }
        public string Headline { get; set; }
        public string ContactInformation { get; set; }
        public string Slug { get; set; }
        public int StatusId { get; set; }
        public List<int> Friends { get; set; }
        public List<string> Tags { get; set; }
        public List<ImageAddRequest> Images { get; set; }
        public List<string> Urls { get; set; }
    }
}
