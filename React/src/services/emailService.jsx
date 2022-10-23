import axios from "axios";

const sendMessage = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/emails",
    data: payload,
    withCredentials: true,
    crossdomian: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const emailService = {
  sendMessage,
};
export default emailService;
