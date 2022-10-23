using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Images;
using Sabio.Models.Domain.Skills;
using Sabio.Models.Domain.Statuses;
using Sabio.Models.Requests.Friends;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class FriendService : IFriendService
    {
        IDataProvider _data = null;

        public FriendService(IDataProvider data)
        {
            _data = data;
        }

        public Friend Get(int id)
        {
            string procName = "[dbo].[Friends_SelectById]";
            Friend aFriend = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                aFriend = MapSingleFriend(reader, ref startingIndex);

            });

            return aFriend;
        }


        public List<Friend> GetAll()
        {
            List<Friend> list = null;
            string procName = "[dbo].[Friends_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short sex)
            {
                int startingIndex = 0;
                Friend aFriend = MapSingleFriend(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Friend>();
                }
                list.Add(aFriend);
            });
            return list;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Friends_Delete]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }
        public void DeleteV2(int id)
        {
            string procName = "[dbo].[Friends_DeleteV3]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }

        public int Add(FriendAddRequest model, int id)
        {
            string procName = "[dbo].[Friends_Insert]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            }
            );

            return id;
        }

        public void Update(FriendUpdateRequest model)
        {
            string procName = "[dbo].[Friends_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }

        private static void AddCommonParams(FriendAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Bio", model.Bio);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@PrimaryImageUrl", model.PrimaryImageUrl);

        }

        private static Friend MapSingleFriend(IDataReader reader, ref int startingIndex)
        {
            Friend aFriend = new Friend();

            aFriend.Id = reader.GetSafeInt32(startingIndex++);
            aFriend.Title = reader.GetSafeString(startingIndex++);
            aFriend.Bio = reader.GetSafeString(startingIndex++);
            aFriend.Summary = reader.GetSafeString(startingIndex++);
            aFriend.Headline = reader.GetSafeString(startingIndex++);
            aFriend.Slug = reader.GetSafeString(startingIndex++);
            aFriend.StatusId = reader.DeserializeObject<List<Status>>(startingIndex++);
            aFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFriend.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aFriend;
        }
        public FriendV3 GetV3(int id)
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
                    aFriend = MapSingleFriendV3(reader, ref startingIndex);
                });
            return aFriend;
        }

        public List<FriendV3> GetAllV3()
        {
            string procName = "[dbo].[Friends_SelectAllV3]";
            List<FriendV3> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                FriendV3 aFriend = MapSingleFriendV3(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<FriendV3>();
                }
                list.Add(aFriend);
            });

            return list;
        }

        public Paged<FriendV3> PaginationV3(int pageIndex, int pageSize)
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
                    FriendV3 aFriend = MapSingleFriendV3(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(12);

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

        public Paged<FriendV3> Search_PaginationV3(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Friends_Search_PaginationV3]";
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
                    FriendV3 aFriend = MapSingleFriendV3(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(12);

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

        public FriendV2 GetV2 (int id)
        {
            string procName = "[dbo].[Friends_SelectByIdV2]";
            FriendV2 aFriend = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aFriend = MapSingleFriendV2(reader, ref startingIndex);
                });
            return aFriend;
        }

        public List<FriendV2> GetAllV2()
        {
            string procName = "[dbo].[Friends_SelectAllV2]";
            List<FriendV2> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                FriendV2 aFriend = MapSingleFriendV2(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<FriendV2>();
                }
                list.Add(aFriend);
            });

            return list;
        }
        public Paged<FriendV2> PaginationV2(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Friends_PaginationV2]";
            Paged<FriendV2> pagedList = null;
            List<FriendV2> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    FriendV3 aFriend = MapSingleFriendV2(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(13);

                    if (list == null)
                    {
                        list = new List<FriendV2>();
                    }
                    list.Add(aFriend);
                });

            if (list != null)
            {
                pagedList = new Paged<FriendV2>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        public Paged<FriendV2> Search_PaginationV2(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Friends_Search_PaginationV2]";
            Paged<FriendV2> pagedList = null;
            List<FriendV2> list = null;
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
                    FriendV3 aFriend = MapSingleFriendV2(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(13);

                    if (list == null)
                    {
                        list = new List<FriendV2>();
                    }

                    list.Add(aFriend);
                });

            if (list != null)
            {
                pagedList = new Paged<FriendV2>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        public int AddV2(FriendAddRequestV2 model, int id)
        {
            string procName = "[dbo].[Friends_InsertV2]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    AddCommonParamsV2(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
            );

            return id;
        }
        public void UpdateV2(FriendUpdateRequestV2 model)
        {
            string procName = "[dbo].[Friends_UpdateV2]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsV2(model, col);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }

        private static void AddCommonParamsV2(FriendAddRequestV2 model, SqlParameterCollection col)
        {

            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Bio", model.Bio);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@ImageTypeId", model.ImageTypeId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);

        }

        public int AddV3(FriendAddRequestV3 model, int id)
        {
            string procName = "[dbo].[Friends_InsertV3]";
            DataTable myParamValue = null;

            if (model.Skills != null)
            {
                myParamValue = MapSkillsToTable(model.Skills);
            }

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    AddCommonParamsV2(model, col);
                    col.AddWithValue("@batchSkills", myParamValue);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                }
            );

            return id;
        }

        public void UpdateV3(FriendUpdateRequestV3 model)
        {
            string procName = "[dbo].[Friends_UpdateV3]";
            DataTable mySkillsParam = null; 

            if (model.Skills != null)
            {
                mySkillsParam = MapSkillsToTable(model.Skills);
            }

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsV2(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@batchSkills", mySkillsParam);
            },
            returnParameters: null);
        }


        private DataTable MapSkillsToTable(List<string> skillsToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Name", typeof(string)); 

            foreach (string singleSkill in skillsToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleSkill); 

                dt.Rows.Add(dr); 
            }

            return dt; 
        }

        private static FriendV3 MapSingleFriendV2(IDataReader reader, ref int startingIndex)
        {
            FriendV3 aFriend = new FriendV3();
            aFriend.PrimaryImage = new List<Image>();

            aFriend.Id = reader.GetSafeInt32(startingIndex++);
            aFriend.Title = reader.GetSafeString(startingIndex++);
            aFriend.Bio = reader.GetSafeString(startingIndex++);
            aFriend.Summary = reader.GetSafeString(startingIndex++);
            aFriend.Headline = reader.GetSafeString(startingIndex++);
            aFriend.Slug = reader.GetSafeString(startingIndex++);
            aFriend.StatusId = reader.DeserializeObject<List<Status>>(startingIndex++);
            aFriend.PrimaryImage = reader.DeserializeObject<List<Image>>(startingIndex++);
            aFriend.UserId = reader.GetSafeInt32(startingIndex++);
            aFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFriend.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aFriend;
        }
        private static FriendV3 MapSingleFriendV3(IDataReader reader, ref int startingIndex)
        {
            FriendV3 aFriend = new FriendV3();
            aFriend.PrimaryImage = new List<Image>(); 
            aFriend.Skills = new List<Skill>();

            aFriend.Id = reader.GetSafeInt32(startingIndex++);
            aFriend.Title = reader.GetSafeString(startingIndex++);
            aFriend.Bio = reader.GetSafeString(startingIndex++);
            aFriend.Summary = reader.GetSafeString(startingIndex++);
            aFriend.Headline = reader.GetSafeString(startingIndex++);
            aFriend.Slug = reader.GetSafeString(startingIndex++);
            aFriend.StatusId = reader.DeserializeObject<List<Status>>(startingIndex++);
            aFriend.PrimaryImage = reader.DeserializeObject<List<Image>>(startingIndex++);
            aFriend.Skills = reader.DeserializeObject<List<Skill>>(startingIndex++);    
            aFriend.UserId = reader.GetSafeInt32(startingIndex++);
            aFriend.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFriend.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aFriend;
        }
    }
}
