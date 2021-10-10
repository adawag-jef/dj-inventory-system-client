import { IUser } from "../features/auth/authSlice";
import {
  IRequestResetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  SetNewPasswordPayload,
} from "../interfaces";
import HttpClient from "./HttpClient";

export default class Client extends HttpClient {
  private static classInstance?: Client;

  private constructor() {
    super("https://dj-inventory.herokuapp.com/api/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Client();
    }

    return this.classInstance;
  }

  public get<P, R = {}>(uri: string) {
    return this.axiosInstance.get<P, R>(uri);
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
}
