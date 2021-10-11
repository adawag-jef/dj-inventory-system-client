import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DataTable, {
  IDataTableColumn,
} from "../../components/controls/datatable";
import { fetchAllRoles, selectRole } from "../../features/role/roleSlice";
import AdminLayout from "../../Layouts/AdminLayout";

const RolePage = () => {
  const dispatch = useAppDispatch();
  const { roles, status, total } = useAppSelector(selectRole);

  const handleTableChange = async (queryString: string = "") => {
    dispatch(fetchAllRoles(queryString));
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
          rows={roles}
          onChange={handleTableChange}
          total={total}
          loading={status === "loading"}
        />
      </div>
    </AdminLayout>
  );
};

export default RolePage;
