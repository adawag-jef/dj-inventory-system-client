import { IRole, Response } from "../interfaces";
import Client from "./Client";

const client = Client.getInstance();

class RoleService {
  public async fetchAllRoles(qs: string) {
    const uri = `auth/role/${qs}`;

    return await client.get<{}, Response<IRole>>(uri);
  }
}

export default new RoleService();
