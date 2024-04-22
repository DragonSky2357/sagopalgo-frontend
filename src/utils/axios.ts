import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": `${process.env.REACT_APP_BASE_URL}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  // const accessToken = cookies.get("accessToken");
  // console.log(accessToken);
  // if (accessToken && config.headers) {
  //   config.headers["Authorization"] = `Bearer ${accessToken}`;
  // }

  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  async (error: any) => {
    if (error.config && error.response && error.response.status === 401) {

      const refreshToken = cookies.get("refreshToken");
      if (refreshToken) {
        return axios
          .get(`${process.env.REACT_APP_API_URL}/auth/reissue`, {
            headers: {
              refresh: refreshToken,
              "Content-Type": "application/json",
              withCredentials: true,
            },
          })
          .then(async (response: any) => {
            if (response.status === 200) {
              console.log(response.data);

              const accessToken = response.headers["access"];
              const refreshToken = response.headers["refresh"];

              cookies.set("accessToken", accessToken);
              cookies.set("refreshToken", refreshToken);

              error.config.headers["Authorization"] = `${accessToken}`;
              return instance(error.config);
            }
          });
      }
    }
    return Promise.reject(error);
  }
);
