import axios from "axios";

const upload = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/files",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios(config);
};

const uploadServices = { upload };
export default uploadServices;
