using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendUpdateRequestV3 : FriendAddRequestV3, IModelIdentifier
    {
        public int Id { get; set; }

    }
}
