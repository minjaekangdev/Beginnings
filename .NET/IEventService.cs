using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IEventService
    {
        Paged<Event> Pagination(int pageIndex, int pageSize);
        int Add(EventAddRequest model, int id);
        void Update(EventUpdateRequest model);
        List<Event> Search_Geo(double latitude, double longtidue, double radius); 
    }
}