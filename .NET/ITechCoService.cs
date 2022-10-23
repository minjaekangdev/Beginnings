using Sabio.Models;
using Sabio.Models.Domain.TechCos;
using Sabio.Models.Requests.TechCos;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ITechCoService
    {
        TechCo Get(int id);
        List<TechCo> GetAll();
        Paged<TechCo> Pagination(int pageIndex, int pageSize);
        Paged<TechCo> Search_Pagination(int pageIndex, int pageSize, string query);
        int Add(TechCoAddRequest model, int id);
        void Update(TechCoUpdateRequest model); 
        void Delete(int id);
    }
}