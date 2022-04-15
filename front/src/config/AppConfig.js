let data;
export const EnviornmentType = {
  DEV: "development",
  PROD: "production",
};
console.log("process.env", process.env);
data = {
  API_ENDPOINT: process.env.REACT_APP_URL,
  API_VERSION: "1.0",
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};

export const AppConfig = data;
