using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.Images;
using Sabio.Models.Domain.Statuses;
using Sabio.Models.Domain.Tags;
using Sabio.Models.Domain.TechCos;
using Sabio.Models.Domain.Urls;
using Sabio.Models.Requests.Friends;
using Sabio.Models.Requests.Images;
using Sabio.Models.Requests.TechCos;
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
    public class TechCoService : ITechCoService
    {
        IDataProvider _data = null;

        public TechCoService(IDataProvider data)
        {
            _data = data;
        }

        public TechCo Get(int id)
        {
            string procName = "[dbo].[TechCompanies_SelectById]";
            TechCo techCo = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }
                , delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    techCo = MapSingleCo(reader, ref startingIndex);
                });

            return techCo;
        }

        public List<TechCo> GetAll()
        {
            List<TechCo> list = null;
            string procName = "[dbo].[TechCompanies_SelectAll]";

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    TechCo techCo = MapSingleCo(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<TechCo>();
                    }
                    list.Add(techCo);
                });
            return list; 
        }

        public Paged<TechCo> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[TechCompanies_Pagination]";
            Paged<TechCo> pagedList = null;
            List<TechCo> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    TechCo techCo = MapSingleCo(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(14);

                    if (list == null)
                    {
                        list = new List<TechCo>();
                    }
                    list.Add(techCo);
                });

            if (list != null)
            {
                pagedList = new Paged<TechCo>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList; 
        }
        public Paged<TechCo> Search_Pagination(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[TechCompanies_Search_Pagination]";
            Paged<TechCo> pagedList = null;
            List<TechCo> list = null;
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
                    TechCo techCo = MapSingleCo(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(14);

                    if (list == null)
                    {
                        list = new List<TechCo>();
                    }

                    list.Add(techCo);
                });

            if (list != null)
            {
                pagedList = new Paged<TechCo>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        public int Add(TechCoAddRequest model, int id)
        {
            string procName = "[dbo].[TechCompanies_Insert]";
            DataTable myImagesParam = null;
            DataTable myUrlsParam = null;
            DataTable myTagsParam = null; 
            DataTable myFriendsParam = null; 

            if (model.Images != null)
            {
                myImagesParam = MapImagesToTable(model.Images); 
            }
            if (model.Urls != null)
            {
                myUrlsParam = MapUrlsToTable(model.Urls);
            }
            if (model.Tags != null)
            {
                myTagsParam = MapTagsToTable(model.Tags);
            }

            if (model.Friends != null)
            {
                myFriendsParam = MapFriendsToTable(model.Friends); 
            }


            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@batchImages", myImagesParam);
                    col.AddWithValue("@batchUrls", myUrlsParam);
                    col.AddWithValue("@batchTags", myTagsParam); 
                    col.AddWithValue("@batchFriends", myFriendsParam); 

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });

            return id; 
        }

        public void Update(TechCoUpdateRequest model)
        {
            string procName = "[dbo].[TechCompanies_Update]";
            DataTable myImagesParam = null;
            DataTable myUrlsParam = null;
            DataTable myTagsParam = null;
            DataTable myFriendsParam = null;

            if (model.Urls != null)
            {
                myUrlsParam = MapUrlsToTable(model.Urls);
            }
            if (model.Friends != null)
            {
                myFriendsParam = MapFriendsToTable(model.Friends);
            }
            if (model.Tags != null)
            {
                myTagsParam = MapTagsToTable(model.Tags);
            }

           

            if (model.Images != null)
            {
                myImagesParam = MapImagesToTable(model.Images);
            }

           

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@batchImages", myImagesParam);
                col.AddWithValue("@batchUrls", myUrlsParam);
                col.AddWithValue("@batchTags", myTagsParam);
                col.AddWithValue("@batchFriends", myFriendsParam);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }


        private DataTable MapImagesToTable(List<ImageAddRequest> imagesToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("TypeId", typeof(int));
            dt.Columns.Add("ImageUrl", typeof(string)); 

            foreach (ImageAddRequest image in imagesToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, image.ImageTypeId);
                dr.SetField(startingIndex++, image.ImageUrl);

                dt.Rows.Add(dr); 
            }
            return dt; 
        }

        private DataTable MapUrlsToTable(List<string> urlsToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Url", typeof(string));

            foreach (string singleUrl in urlsToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleUrl);

                dt.Rows.Add(dr);
            }
            return dt;
        }
        private DataTable MapTagsToTable(List<string> tagsToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Tag", typeof(string));

            foreach (string singleUrl in tagsToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleUrl);

                dt.Rows.Add(dr);
            }
            return dt;
        }
        private DataTable MapFriendsToTable(List<int> friendsToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("FriendId", typeof(int));

            foreach (int singleFriend in friendsToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex++, singleFriend);

                dt.Rows.Add(dr);
            }
            return dt;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[TechCompanies_Delete]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                });
        }

        private static void AddCommonParams(TechCoAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Profile", model.Profile);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@ContactInformation", model.ContactInformation);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
        }

        private static TechCo MapSingleCo(IDataReader reader, ref int startingIndex)
        {
            TechCo techCo = new TechCo();
            techCo.StatusId = new List<Status>(); 
            techCo.Urls = new List<CompanyUrl>();
            techCo.Tags = new List<CompanyTag>();
            techCo.Friends = new List<FriendV3>();
            techCo.Images = new List<Image>(); 

            techCo.Id = reader.GetSafeInt32(startingIndex++);
            techCo.Name = reader.GetSafeString(startingIndex++);
            techCo.Profile = reader.GetSafeString(startingIndex++);
            techCo.Summary = reader.GetSafeString(startingIndex++);
            techCo.Headline = reader.GetSafeString(startingIndex++);
            techCo.ContactInformation = reader.GetSafeString(startingIndex++);
            techCo.Slug = reader.GetSafeString(startingIndex++);
            techCo.StatusId = reader.DeserializeObject<List<Status>>(startingIndex++);
            techCo.Urls = reader.DeserializeObject<List<CompanyUrl>>(startingIndex++);
            techCo.Tags = reader.DeserializeObject<List<CompanyTag>>(startingIndex++);
            techCo.Friends = reader.DeserializeObject<List<FriendV3>>(startingIndex++);
            techCo.Images = reader.DeserializeObject<List<Image>>(startingIndex++);
            techCo.DateCreated = reader.GetSafeDateTime(startingIndex++);
            techCo.DateModified = reader.GetSafeDateTime(startingIndex++);


            return techCo;
        }
    }
}
