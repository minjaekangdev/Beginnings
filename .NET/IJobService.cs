using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Requests.Jobs;

namespace Sabio.Services.Interfaces
{
    public interface IJobService
    {
        Job Get(int id);
        Paged<Job> Pagination(int pageIndex, int pageSize);
        Paged<Job> Search_Pagination(int pageIndex, int pageSize, string query);
        int Add(JobAddRequest model, int id);
        void Update(JobUpdateRequest model); 
        void Delete(int id);
    }
}