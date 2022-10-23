using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Images
{
    public class ImageAddRequest
    {
        public int ImageTypeId { get; set; }
        public string ImageUrl { get; set; }
    }
}
