import { IRole, Response, RolePayload } from "../interfaces";
import Client from "./Client";

const client = Client.getInstance();

class RoleService {
  public async fetchAllRoles(qs: string) {
    const uri = `auth/role/${qs}`;

    return await client.get<{}, Response<IRole>>(uri);
  }
  public async createRole(payload: RolePayload) {
    const uri = `auth/role/`;

    return await client.post<RolePayload, IRole>(uri, payload);
  }
  public async updateRole(payload: RolePayload) {
    const { id, ..._payload } = payload;
    const uri = `auth/role/${id}/`;

    return await client.put<RolePayload, IRole>(uri, _payload);
  }
  public async destroyRole(id: number) {
    const uri = `auth/role/${id}/`;

    return await client.delete<number>(uri);
  }
}

export default new RoleService();
