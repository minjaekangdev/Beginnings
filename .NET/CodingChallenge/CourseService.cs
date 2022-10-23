using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.CodingChallenge
{
    public class CourseService : ICourseService
    {
        IDataProvider _data = null;

        public CourseService(IDataProvider data)
        {
            _data = data;
        }

        public int AddCourse(CourseAddRequest model)
        {
            int id = 0; 
            string procName = "[dbo].[Courses_Insert]";

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
                });

            return id;
        }

        public Course GetCourseById(int id)
        {
            string procName = "[dbo].[Courses_SelectById]";
            Course aCourse = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aCourse = MapSingleCourse(reader, ref startingIndex);
                });

            return aCourse;
        }

        public void UpdateCourse(CourseUpdateRequest model)
        {
            string procName = "[dbo].[Courses_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    AddCommonParams(model, col);
                
                }, returnParameters: null);
        }

        public void DeleteStudent(int id)
        {
            string procName = "[dbo].[Students_Delete]";

            _data.ExecuteNonQuery(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                });
        }

        public Paged<Course> GetCoursesByPage(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Courses_Pagination]";
            Paged<Course> pagedList = null;
            List<Course> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Course aCourse = MapSingleCourse(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(6); 

                    if (list == null)
                    {
                        list = new List<Course>(); 
                    }
                    list.Add(aCourse);
                });
            if (list != null)
            {
                pagedList = new Paged<Course>(list, pageIndex, pageSize, totalCount);    
            }
            return pagedList; 
        }

        private static Course MapSingleCourse(IDataReader reader, ref int startingIndex)
        {
            Course aCourse = new Course();

            aCourse.Id = reader.GetSafeInt32(startingIndex++);
            aCourse.Name = reader.GetSafeString(startingIndex++);
            aCourse.Description = reader.GetSafeString(startingIndex++);
            aCourse.SeasonTerm = reader.GetSafeString(startingIndex++);
            aCourse.Teacher = reader.GetSafeString(startingIndex++);
            aCourse.Students = reader.DeserializeObject<List<Student>>(startingIndex++);

            return aCourse;
        }

        private static void AddCommonParams(CourseAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@SeasonTermId", model.SeasonTermId);
            col.AddWithValue("@TeacherId", model.TeacherId);
        }
    }
}
