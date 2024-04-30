import axios from "axios";

export const getAccounts = async (payload) => {
  const options = {
    method: "POST",
    url: "https://sandbox.belvo.com/api/accounts/",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        "Basic NTU4NGUwYzktMjMyOC00YzdmLWIxYjktNGU2NGVmY2FlOWFjOlhpSC1vRDNzQG1uRG9iQjVCMnFPN01QQk1Eako3QjE0cmtxSXdRQzBnUC1udFNEcWREOGlxZ0FwV2RITzBHUkc=",
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
