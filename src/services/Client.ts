import { LoginPayload, RegisterPayload } from "../interfaces";
import HttpClient from "./HttpClient";

export default class Client extends HttpClient {
  private static classInstance?: Client;

  private constructor() {
    super("http://127.0.0.1:8000/api/");
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new Client();
    }

    return this.classInstance;
  }

  public registerUser = (registerPayload: RegisterPayload) =>
    this.axiosInstance.post<RegisterPayload>(
      "/auth/register/",
      registerPayload
    );
  public loginUser = (loginPayload: LoginPayload) =>
    this.axiosInstance.post<LoginPayload>("/auth/login/", loginPayload);
}
