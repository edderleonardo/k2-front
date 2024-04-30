export const generatePasswordInSandBox = (name) => {
  console.log("🚀 ~ generatePasswordInSandBox ~ name:", name);
  const payload = {
    institution: name,
    username: "",
    password: "",
  };

  if (name === "erebor_mx_retail") {
    payload.username = "bnk100"
    payload.password = "full"
  } else if (name === "erebor_co_retail") {
    payload.username = "bnk101"
    payload.password = "nodata"
  } else if (name === "erebor_br_retail") {
    payload.username = "bnk102"
    payload.password = "low"
  }

  return payload;
};
