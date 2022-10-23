using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Skills;

namespace Sabio.Models.Domain.Friends
{
    public class FriendV3 :FriendV2
    {
        public List<Skill> Skills { get; set; }
    }
}
