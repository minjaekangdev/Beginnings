using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
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
    public class UserServiceV1 : IUserServiceV1
    {
        IDataProvider _data = null;
        public UserServiceV1(IDataProvider data)
        {
            _data = data;
        }

        public int Add(UserAddRequest model)
        {
            int id = 0;
            string procName = "[dbo].[Users_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
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

        public void Update(UserUpdateRequest model)
        {
            string procName = "[dbo].[Users_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public User Get(int id)
        {
            string procName = "[dbo].[Users_SelectById]";

            User aUser = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                aUser = MapSingleUser(reader);
            });

            return aUser;
        }

        public List<User> GetAll()
        {
            List<User> list = null;
            string procName = "[dbo].[Users_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                User aUser = MapSingleUser(reader);

                if (list == null)
                {
                    list = new List<User>();
                }
                list.Add(aUser);
            });

            return list;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Users_Delete]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            });
        }

        private static User MapSingleUser(IDataReader reader)
        {
            User aUser = new User();
            int startingIndex = 0;

            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.FirstName = reader.GetSafeString(startingIndex++);
            aUser.LastName = reader.GetSafeString(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.AvatarUrl = reader.GetSafeString(startingIndex++);
            aUser.TenantId = reader.GetSafeString(startingIndex++);
            aUser.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aUser.DateModified = reader.GetSafeDateTime(startingIndex++);
            return aUser;
        }
        private static void AddCommonParams(UserAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@Password", model.Password);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
            col.AddWithValue("@tenantId", model.TenantId);
        }
    }
}
