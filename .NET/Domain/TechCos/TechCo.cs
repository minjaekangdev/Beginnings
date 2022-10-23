using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Images;
using Sabio.Models.Domain.Statuses;
using Sabio.Models.Domain.Tags;
using Sabio.Models.Domain.Urls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TechCos
{
    public class TechCo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Profile { get; set; }
        public string Summary { get; set; }
        public string Headline { get; set; }
        public string ContactInformation { get; set; }
        public string Slug { get; set; }
        public List<Status> StatusId { get; set; }
        public List<CompanyUrl> Urls { get; set; }
        public List<CompanyTag> Tags { get; set; }
        public List<FriendV3> Friends { get; set; }
        public List<Image> Images { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
