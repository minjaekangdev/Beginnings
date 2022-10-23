using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Addresses
{
    public class AddressAddRequest
    {
        [Required]
        public int SuiteNumber { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        [Range(1,99999)]
        public string PostalCode { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 6)]
        public string LineOne { get; set; }
        [Required]
        [Range(-90,90)]
        public double Lat { get; set; }
        [Required]
        [Range(-90, 90)]
        public double Long { get; set; }
    }
}
