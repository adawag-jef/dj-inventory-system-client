import { IPermission, Response } from "../interfaces";
import Client from "./Client";

const client = Client.getInstance();

class PermissionService {
  public fetchAllPermissions(qs: string): Promise<Response<IPermission>> {
    const uri = `auth/permission/${qs}`;

    return new Promise(async (res, rej) => {
      try {
        const response = await client.get<{}, Response<IPermission>>(uri);
        return res(response);
      } catch (error) {
        return rej(error);
      }
    });
  }
}

export default new PermissionService();
