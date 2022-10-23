using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Addresses
{
    //for data coming from the database
    public class BaseAddress
    {
        public int Id { get; set; }
        public string LineOne { get; set; }
        public int SuiteNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }

    }
}
