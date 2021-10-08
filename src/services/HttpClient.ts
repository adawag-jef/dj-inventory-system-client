import axios, { AxiosInstance, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = never> extends Promise<T> {}
}

export default abstract class HttpClient {
  protected readonly axiosInstance: AxiosInstance;
  private baseURL: string;
  public constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.axiosInstance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      error.response.data.details === "nvalid credentials" &&
      originalRequest.url === this.baseURL + "/auth/token-refresh/"
    ) {
      // window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      //   error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return this.axiosInstance
            .post("/auth/token-refresh/", {
              refresh: refreshToken,
            })
            .then((response: any) => {
              localStorage.setItem(
                "access_token",
                String(response.data.tokens.access)
              );
              // localStorage.setItem('refresh_token', response.data.refresh);
              if (this.axiosInstance.defaults.headers) {
                this.axiosInstance.defaults.headers["Authorization"] =
                  "Bearer " + response.data.tokens.access;
                originalRequest.headers["Authorization"] =
                  "Bearer " + response.data.access;
              }

              return this.axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        return Promise.reject(error);
        // window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  };
}