using Sabio.Models.Domain.Images;
using Sabio.Models.Domain.Skills;
using Sabio.Models.Domain.Statuses;
using Sabio.Models.Domain.TechCos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Jobs
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public string Pay { get; set; }
        public string Slug { get; set; }
        public List<Status> StatusId { get; set; }
        public List<Skill> Skills { get; set; }
        public List<Image> Images { get; set; }
        public List<TechCo> TechCompanyId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}
