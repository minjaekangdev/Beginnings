using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Jobs
{
    public class JobUpdateRequest : JobAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
