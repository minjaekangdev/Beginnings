using Sabio.Data.Providers;
using Sabio.Models.Domain.Events;
using Sabio.Models.Domain.Jobs;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models;
using Sabio.Models.Domain.Skills;
using Sabio.Models.Domain.Statuses;
using Sabio.Models.Domain.TechCos;
using Sabio.Services.Interfaces;
using Sabio.Models.Requests.Events;

namespace Sabio.Services
{
    public class EventService : IEventService
    {
        IDataProvider _data = null;

        public EventService(IDataProvider data)
        {
            _data = data;
        }

        public Paged<Event> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Events_Pagination]";
            Paged<Event> pagedList = null;
            List<Event> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Event aEvent = MapSingleEvent(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(10);

                    if (list == null)
                    {
                        list = new List<Event>();
                    }
                    list.Add(aEvent);
                });
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public int Add(EventAddRequest model, int id)
        {
            string procName = "[dbo].[Events_Insert]";

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

        public void Update(EventUpdateRequest model)
        {
            string procName = "[dbo].[Events_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                }, returnParameters: null);
        }

        public List<Event> Search_Geo(double latitude, double longitude, double radius)
        {
            string procName = "[dbo].[Events_Search_Geo]";
            List<Event> list = null;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@lat", latitude);
                    parameterCollection.AddWithValue("@lng", longitude);
                    parameterCollection.AddWithValue("@radius", radius);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Event aEvent = MapSingleEvent(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<Event>();
                    }
                    list.Add(aEvent);
                });

            return list; 
        }

        private static void AddCommonParams(EventAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@DateStart", model.MetaData.DateStart);
            col.AddWithValue("@DateEnd", model.MetaData.DateEnd);
            col.AddWithValue("@Latitude", model.MetaData.Location.Latitude);
            col.AddWithValue("@Longitude", model.MetaData.Location.Longitude);
            col.AddWithValue("@Address", model.MetaData.Location.Address);
            col.AddWithValue("@ZipCode", model.MetaData.Location.ZipCode);
        }

        private static Event MapSingleEvent(IDataReader reader, ref int startingIndex)
        {
            Event aEvent = new Event();

            aEvent.Id = reader.GetInt32(startingIndex++);
            aEvent.Name = reader.GetSafeString(startingIndex++);
            aEvent.Headline = reader.GetSafeString(startingIndex++);
            aEvent.Description = reader.GetSafeString(startingIndex++);
            aEvent.Summary = reader.GetSafeString(startingIndex++);
            aEvent.Slug = reader.GetSafeString(startingIndex++);
            aEvent.StatusId = reader.DeserializeObject<List<Status>>(startingIndex++);
            aEvent.MetaData = reader.DeserializeObject<List<MetaData>>(startingIndex++);
            aEvent.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aEvent.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aEvent;
        }


    }
}
