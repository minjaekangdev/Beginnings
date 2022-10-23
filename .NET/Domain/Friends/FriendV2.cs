using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Images;

namespace Sabio.Models.Domain.Friends
{
    public class FriendV2 :Friend
    {
        public List<Image> PrimaryImage { get; set; }

    }
}
