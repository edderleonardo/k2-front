import axios from "axios";

export const getLink = async (payload) => {
  const options = {
    method: "POST",
    url: "https://sandbox.belvo.com/api/links/",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        "Basic NTU4NGUwYzktMjMyOC00YzdmLWIxYjktNGU2NGVmY2FlOWFjOlhpSC1vRDNzQG1uRG9iQjVCMnFPN01QQk1Eako3QjE0cmtxSXdRQzBnUC1udFNEcWREOGlxZ0FwV2RITzBHUkc=",
    },
    data: {
      ...payload,
      access_mode: "recurrent",
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
