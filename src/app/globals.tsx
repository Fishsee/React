// @ts-ignore: Ignore error TS7034
let authToken = null;

// @ts-ignore: Ignore error TS7006
export const setAuthToken = (token) => {
  authToken = token;
};

// @ts-ignore: Ignore error TS7005
export const getAuthToken = () => authToken;
