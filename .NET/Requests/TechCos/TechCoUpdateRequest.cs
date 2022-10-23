using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TechCos
{
    public class TechCoUpdateRequest : TechCoAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
