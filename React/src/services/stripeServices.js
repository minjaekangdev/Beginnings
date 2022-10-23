import axios from "axios";

const endpoint = "https://localhost:50001/create-payment-intent";

const createPaymentIntent = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const createCheckoutSession = (payload) => {
  const config = {
    method: "POST",
    url: "https://localhost:50001/create-checkout-session",
    data: payload,
    headers: { "Content-Type": "text/html" },
    crossdomain: true,
    withCredentials: true,
  };
  return axios(config);
};

const stripeServices = { createPaymentIntent, createCheckoutSession };

export default stripeServices;
