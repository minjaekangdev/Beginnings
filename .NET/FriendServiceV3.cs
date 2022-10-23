using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Skills;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class FriendServiceV3 : IFriendServiceV3
    {
        IDataProvider _data = null;

        public FriendServiceV3(IDataProvider data)
        {
            _data = data;
        }

        public FriendV3 Get(int id)
        {
            string procName = "[dbo].[Friends_SelectByIdV3]";
            FriendV3 aFriend = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aFriend = MapFriend(reader, ref startingIndex);
                });
            return aFriend;
        }

        public List<FriendV3> GetAll()
        {
            string procName = "[dbo].[Friends_SelectAllv3]";
            List<FriendV3> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                FriendV3 aFriend = MapFriend(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<FriendV3>();
                }
                list.Add(aFriend);
            });

            return list;
        }

        public Paged<FriendV3> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Friends_PaginationV3]";
            Paged<FriendV3> pagedList = null;
            List<FriendV3> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    FriendV3 aFriend = MapFriend(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(32);

                    if (list == null)
                    {
                        list = new List<FriendV3>();
                    }

                    list.Add(aFriend);
                });

            if (list != null)
            {
                pagedList = new Paged<FriendV3>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        public Paged<FriendV3> Search_Pagination(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Friends_PaginationV3]";
            Paged<FriendV3> pagedList = null;
            List<FriendV3> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                    paramCollection.AddWithValue("@Query", query);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    FriendV3 aFriend = MapFriend(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(32);

                    if (list == null)
                    {
                        list = new List<FriendV3>();
                    }

                    list.Add(aFriend);
                });

            if (list != null)
            {
                pagedList = new Paged<FriendV3>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        private static FriendV3 MapFriend(IDataReader reader, ref int startingIndex)
        {
            FriendV3 aFriend = new FriendV3();

            aFriend.Id = reader.GetSafeInt32(startingIndex++);
            aFriend.Title = reader.GetSafeString(startingIndex++);
            aFriend.Bio = reader.GetSafeString(startingIndex++);
            aFriend.Summary = reader.GetSafeString(startingIndex++);
            aFriend.Headline = reader.GetSafeString(startingIndex++);
            aFriend.Slug = reader.GetSafeString(startingIndex++);
            aFriend.StatusId = reader.GetSafeInt32(startingIndex++);
            aFriend.PrimaryImage.id = reader.GetSafeInt32(startingIndex++);
            aFriend.PrimaryImage.TypeId = reader.GetSafeInt32(startingIndex++);
            aFriend.PrimaryImage.Url = reader.GetSafeString(startingIndex++);
            aFriend.Skills = reader.DeserializeObject<List<Skill>>(startingIndex++);
            aFriend.UserId = reader.GetSafeInt32(startingIndex++);
            aFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFriend.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aFriend;
        }
    }
}
