import axios from "axios";

const endpoint = "https://localhost:50001/api/event";

const addEvent = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const updateEvent = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const searchEvent = (pageIndex, pageSize, dateStart, dateEnd) => {
  const config = {
    method: "GET",
    url: `${endpoint} /search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getEvents = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const searchGeo = (latitude, longitude, radius) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search/geo?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const eventsService = {
  addEvent,
  updateEvent,
  searchEvent,
  getEvents,
  searchGeo,
};
export default eventsService;
