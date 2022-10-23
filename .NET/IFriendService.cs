using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFriendService
    {
        int Add(FriendAddRequest model, int id);
        int AddV3(FriendAddRequestV3 model, int id);    
        void Delete(int id);
        void DeleteV2(int id);
        Friend Get(int id);
        List<Friend> GetAll();
        List<FriendV3> GetAllV3();
        FriendV3 GetV3(int id);
        Paged<FriendV3> PaginationV3(int pageIndex, int pageSize);
        Paged<FriendV3> Search_PaginationV3(int pageIndex, int pageSize, string query);
        FriendV2 GetV2(int id);
        List<FriendV2> GetAllV2();
        Paged<FriendV2> PaginationV2(int pageIndex, int pageSize);
        Paged<FriendV2> Search_PaginationV2(int pageIndex, int pageSize, string query);
        int AddV2(FriendAddRequestV2 model, int id);
        void UpdateV2(FriendUpdateRequestV2 model);
        void UpdateV3(FriendUpdateRequestV3 model);
        void Update(FriendUpdateRequest model);
    }
}