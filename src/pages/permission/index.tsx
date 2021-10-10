import { IconButton } from "@mui/material";
import React from "react";
import DataTable, {
  IDataTableColumn,
} from "../../components/controls/datatable";
import AdminLayout from "../../Layouts/AdminLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectPermission,
  fetchAllPermissions,
} from "../../features/permission/permissionSlice";

const PermissionPage = () => {
  const dispatch = useAppDispatch();
  const { permissions, status, total } = useAppSelector(selectPermission);

  const handleTableChange = async (queryString: string = "") => {
    dispatch(fetchAllPermissions(queryString));
  };

  const columns: IDataTableColumn[] = React.useMemo(
    () => [
      {
        id: "id",
        name: "ID",
        enableSort: true,
        align: "left",
      },
      {
        id: "title",
        name: "Title",
        enableSort: true,
        align: "left",
      },
      {
        id: "description",
        name: "Description",
        enableSort: true,
        align: "left",
      },
      {
        id: "action",
        name: "action",
        enableSort: false,
        align: "center",
        action: (item: any) => {
          return (
            <div style={{ display: "flex" }}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  alert(JSON.stringify(item));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  alert(JSON.stringify(item));
                }}
              >
                <EditIcon />
              </IconButton>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <AdminLayout>
      <div style={{ padding: 30 }}>
        <DataTable
          columnData={columns}
          rows={permissions}
          onChange={handleTableChange}
          total={total}
          loading={status === "loading"}
        />
      </div>
    </AdminLayout>
  );
};

export default PermissionPage;
