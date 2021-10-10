import { IconButton } from "@mui/material";
import React from "react";
import DataTable, {
  IDataTableColumn,
} from "../../components/controls/datatable";
import AdminLayout from "../../Layouts/AdminLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllUsers, selectUser } from "../../features/user/userSlice";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { users, status, total } = useAppSelector(selectUser);

  const handleTableChange = async (queryString: string = "") => {
    dispatch(fetchAllUsers(queryString));
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
        id: "username",
        name: "Username",
        enableSort: true,
        align: "left",
      },
      {
        id: "email",
        name: "Email",
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
          rows={users}
          onChange={handleTableChange}
          total={total}
          loading={status === "loading"}
        />
      </div>
    </AdminLayout>
  );
};

export default UserPage;
