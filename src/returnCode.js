export const containerNotFound = (info) => {
  return {
    errorCode: -1,
    desp: "Container " + info + " not found"
  };
};

export const resultOk = (info) => {
  return {
    errorCode: 0,
    desp: "ok",
    data: info
  };
};

export const serverError = () => {
  return {
    errorCode: -999,
    desp: "server error"
  };
};
