import { IPermission } from "../interfaces";
import Client from "./Client";

const client = Client.getInstance();

interface Response {
  page: number;
  size_per_page: number;
  total_pages: number;
  total: number;
  results: IPermission[];
}

class PermissionService {
  public fetchAllPermissions(qs: string) {
    const uri = `auth/permission/${qs}`;
    return client.get<{}, Response>(uri);
  }
}

export default new PermissionService();
