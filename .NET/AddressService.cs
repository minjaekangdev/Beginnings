using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;
using System.Net;
using Sabio.Services.Interfaces;

namespace Sabio.Services
{
    public class AddressService : IAddressService
    {
        IDataProvider _data = null;
        public AddressService(IDataProvider data)
        {
            _data = data;
        }

        public void Update(AddressUpdateRequest model)
        {
            string procName = "[dbo].[Sabio_Addresses_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public int Add(AddressAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Sabio_Addresses_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    //and 1 id output 

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Sabio_Addresses_DeleteById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            });
        }

        public Address Get(int id)
        {
            string procName = "[dbo].[Sabio_Addresses_SelectById]";

            Address address = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set) //single record mapper
            {
                address = MapSingleAddress(reader);
            }
            );

            return address;
        }

        public List<Address> GetRandomAddresses()
        {
            List<Address> list = null;
            string procName = "[dbo].[Sabio_Addresses_SelectRandom50]";

            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Address aAddress = MapSingleAddress(reader);

                if (list == null)
                {
                    list = new List<Address>();
                }

                list.Add(aAddress);
            }
            );

            return list;
        }

        private static Address MapSingleAddress(IDataReader reader)
        {
            Address aAddress = new Address();

            int startingIndex = 0;

            aAddress.Id = reader.GetSafeInt32(startingIndex++);
            aAddress.LineOne = reader.GetSafeString(startingIndex++);
            aAddress.SuiteNumber = reader.GetSafeInt32(startingIndex++);
            aAddress.City = reader.GetSafeString(startingIndex++);
            aAddress.State = reader.GetSafeString(startingIndex++);
            aAddress.PostalCode = reader.GetSafeString(startingIndex++);
            aAddress.IsActive = reader.GetSafeBool(startingIndex++);
            aAddress.Lat = reader.GetSafeDouble(startingIndex++);
            aAddress.Long = reader.GetSafeDouble(startingIndex++);
            return aAddress;
        }
        private static void AddCommonParams(AddressAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@SuiteNumber", model.SuiteNumber);
            col.AddWithValue("@IsActive", model.IsActive);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@State", model.State);
            col.AddWithValue("@PostalCode", model.PostalCode);
            col.AddWithValue("@LineOne", model.LineOne);
            col.AddWithValue("@Lat", model.Lat);
            col.AddWithValue("@Long", model.Long);
        }
    }

}
