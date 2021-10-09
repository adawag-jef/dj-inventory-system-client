import { IUser, Response } from "../interfaces";
import Client from "./Client";

const client = Client.getInstance();

class UserService {
  public fetchAllUsers(qs: string): Promise<Response<IUser>> {
    const uri = `auth/users/${qs}`;

    return new Promise(async (res, rej) => {
      try {
        const response = await client.get<{}, Response<IUser>>(uri);
        return res(response);
      } catch (error) {
        return rej(error);
      }
    });
  }
}

export default new UserService();
