using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Images;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Domain.Skills;
using Sabio.Models.Domain.Statuses;
using Sabio.Models.Domain.TechCos;
using Sabio.Models.Requests.Images;
using Sabio.Models.Requests.Jobs;
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
    public class JobService : IJobService
    {
        IDataProvider _data = null;

        public JobService(IDataProvider data)
        {
            _data = data;
        }

        public Job Get(int id)
        {
            string procName = "[dbo].[Jobs_SelectById]";
            Job aJob = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aJob = MapSingleJob(reader, ref startingIndex);
                });
            return aJob;
        }

        public Paged<Job> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Jobs_Pagination]";
            Paged<Job> pagedList = null;
            List<Job> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Job aJob = MapSingleJob(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(12);

                    if (list == null)
                    {
                        list = new List<Job>();
                    }
                    list.Add(aJob);
                });
            if (list != null)
            {
                pagedList = new Paged<Job>(list, pageIndex, pageSize, totalCount); 
            }
            return pagedList; 
        }

        public Paged<Job> Search_Pagination(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Jobs_Search_Pagination]";
            Paged<Job> pagedList = null;
            List<Job> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Job aJob = MapSingleJob(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(12); 

                    if (list == null)
                    {
                        list = new List<Job>();
                    }

                    list.Add(aJob);
                });

            if (list != null)
            {
                pagedList = new Paged<Job>(list, pageIndex, pageSize, totalCount); 
            }
            return pagedList;
        }

        public int Add(JobAddRequest model, int id)
        {
            string procName = "[dbo].[Jobs_Insert]";
            DataTable mySkillsParam = null;
            DataTable myImagesParam = null; 

            if (model.Skills != null)
            {
                mySkillsParam = MapSkillsToTable(model.Skills);
            }
            if (model.Images != null)
            {
                myImagesParam = MapImagesToTable(model.Images); 
            }

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@batchSkills", mySkillsParam);
                    col.AddWithValue("@batchImages", myImagesParam);

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

        public void Delete(int id)
        {
            string procName = "[dbo].[Jobs_Delete]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                });
        }

        public void Update(JobUpdateRequest model)
        {
            string procName = "[dbo].[Jobs_Update]";
            DataTable mySkillsParam = null;
            DataTable myImagesParam = null;

            if (model.Skills != null)
            {
                mySkillsParam = MapSkillsToTable(model.Skills);
            }
            if (model.Images != null)
            {
                myImagesParam = MapImagesToTable(model.Images);
            }

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@batchSkills", mySkillsParam);
                    col.AddWithValue("@batchImages", myImagesParam);
                    col.AddWithValue("@Id", model.Id);
                }, returnParameters: null);
        }

        private DataTable MapSkillsToTable(List<string> skillsToMap)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Name", typeof(string)); 

            foreach (string singleSkill in skillsToMap)
            {
                DataRow dr = dt.NewRow();
                int startingIndex = 0;

                dr.SetField(startingIndex, singleSkill);

                dt.Rows.Add(dr); 
            }
            return dt; 
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

        private static void AddCommonParams(JobAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Pay", model.Pay);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@TechCompanyId", model.TechCompanyId);
        }

        private static Job MapSingleJob(IDataReader reader, ref int startingIndex)
        {
            Job aJob = new Job();
            aJob.Skills = new List<Skill>();
            aJob.StatusId = new List<Status>();
            aJob.TechCompanyId = new List<TechCo>();
            aJob.Images = new List<Image>(); 

            aJob.Id = reader.GetInt32(startingIndex++);
            aJob.Title = reader.GetSafeString(startingIndex++);
            aJob.Description = reader.GetSafeString(startingIndex++);
            aJob.Summary = reader.GetSafeString(startingIndex++);
            aJob.Pay = reader.GetSafeString(startingIndex++);
            aJob.Slug = reader.GetSafeString(startingIndex++);
            aJob.StatusId = reader.DeserializeObject<List<Status>>(startingIndex++);
            aJob.Skills = reader.DeserializeObject<List<Skill>>(startingIndex++);
            aJob.Images = reader.DeserializeObject<List<Image>>(startingIndex++);
            aJob.TechCompanyId = reader.DeserializeObject<List<TechCo>>(startingIndex++);
            aJob.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aJob.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aJob;
        }

    }
}
