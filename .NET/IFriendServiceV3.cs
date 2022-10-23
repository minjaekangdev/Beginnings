using Sabio.Models;
using Sabio.Models.Domain.Friends;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFriendServiceV3
    {
        FriendV3 Get(int id);
        List<FriendV3> GetAll();
        Paged<FriendV3> Pagination(int pageIndex, int pageSize);
        Paged<FriendV3> Search_Pagination(int pageIndex, int pageSize, string query);
    }
}