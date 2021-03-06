import { AxiosResponse } from "axios";
import { IUser } from "../features/auth/authSlice";
import {
  IRequestResetPasswordPayload,
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  SetNewPasswordPayload,
  VerifyUserPayload,
} from "../interfaces";
import HttpClient from "./HttpClient";

export default class Client extends HttpClient {
  private static classInstance?: Client;

  private constructor() {
    super(`${process.env.REACT_APP_BASE_URL}`);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Client();
    }

    return this.classInstance;
  }

  public get<P, R = AxiosResponse<P>>(uri: string) {
    return this.axiosInstance.get<P, R>(uri);
  }
  public post<P, R = AxiosResponse<P>>(uri: string, payload: P) {
    return this.axiosInstance.post<P, R>(uri, payload);
  }
  public put<P, R = AxiosResponse<P>>(uri: string, payload: P) {
    return this.axiosInstance.put<P, R>(uri, payload);
  }
  public delete<P, R = AxiosResponse<P>>(uri: string) {
    return this.axiosInstance.delete<P, R>(uri);
  }

  public registerUser = (registerPayload: RegisterPayload) =>
    this.axiosInstance.post<RegisterPayload, IUser>(
      "/auth/register/",
      registerPayload
    );
  public loginUser = async (loginPayload: LoginPayload) =>
    await this.axiosInstance.post<LoginPayload, IUser>(
      "/auth/login/",
      loginPayload
    );

  public requestResetPassword = async (
    requestPayload: IRequestResetPasswordPayload
  ) => {
    return await this.axiosInstance.post<IRequestResetPasswordPayload>(
      "/auth/request-reset-email/",
      requestPayload
    );
  };
  public setNewPassword = async (requestPayload: SetNewPasswordPayload) => {
    return await this.axiosInstance.patch<SetNewPasswordPayload>(
      "/auth/password-reset-complete/",
      requestPayload
    );
  };
  public verifyCurrentUser = async (requestPayload: VerifyUserPayload) => {
    return await this.axiosInstance.post<VerifyUserPayload, IUser>(
      "/auth/token-verify/",
      requestPayload
    );
  };
  public logout = async (requestPayload: LogoutPayload) => {
    return await this.axiosInstance.post<LogoutPayload>(
      "/auth/logout/",
      requestPayload
    );
  };
}
