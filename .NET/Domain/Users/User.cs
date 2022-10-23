using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class User : BaseUser
    {
        public string LastName { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}
