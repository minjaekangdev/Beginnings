using Sabio.Models.Domain.Skills;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendAddRequestV3 : FriendAddRequestV2
    {
        public List<string> Skills { get; set; }
    }
}
