import { IPermission, PermissionPayload, Response } from "../interfaces";
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

  public async listPermission(): Promise<IPermission[]> {
    const uri = `auth/permission/?pages=All`;
    return await client.get(uri);
  }
  public async createPermission(payload: PermissionPayload) {
    const uri = `auth/permission/`;
    return await client.post<PermissionPayload, IPermission>(uri, payload);
  }
  public async updatePermission(payload: PermissionPayload, id: number) {
    const uri = `auth/permission/${id}/`;
    return await client.put<PermissionPayload, IPermission>(uri, payload);
  }
  public async deletePermission(id: number) {
    const uri = `auth/permission/${id}/`;
    return await client.delete(uri);
  }
}

export default new PermissionService();
