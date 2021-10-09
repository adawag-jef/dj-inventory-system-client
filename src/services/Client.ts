import { IUser } from "../features/auth/authSlice";
import { LoginPayload, RegisterPayload } from "../interfaces";
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
    this.axiosInstance.post<RegisterPayload>(
      "/auth/register/",
      registerPayload
    );
  public loginUser = async (loginPayload: LoginPayload) =>
    await this.axiosInstance.post<LoginPayload, IUser>(
      "/auth/login/",
      loginPayload
    );
}
