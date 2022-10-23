using Sabio.Models.Domain.Statuses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Friends
{
    public class Friend
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Bio { get; set; }
        public string Summary { get; set; }
        public string Headline { get; set; }
        public string Slug { get; set; }
        public List<Status> StatusId { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}
