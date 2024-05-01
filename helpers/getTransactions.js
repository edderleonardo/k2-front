import axios from "axios";

export const getTransactions = async (payload) => {
  const url = import.meta.env.VITE_BASE_URL;
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const base64Credentials = btoa(username + ":" + password);

  const options = {
    method: "POST",
    url: `${url}/api/transactions/`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${base64Credentials}`,
    },
    data: {
      ...payload,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
