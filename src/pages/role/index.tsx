import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RoleForm from "../../components/auth/role-form";
import DataTable, {
  IDataTableColumn,
} from "../../components/controls/datatable";
import {
  createRole,
  updateRole,
  fetchAllRoles,
  selectRole,
  destroyRole,
} from "../../features/role/roleSlice";
import { IRole, RolePayload } from "../../interfaces";
import AdminLayout from "../../Layouts/AdminLayout";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  permissions: yup.array().min(1, "permission is required"),
});

const initialValues: RolePayload = {
  title: "",
  description: "",
  permissions: [],
};

const RolePage = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectRole);
  const [edit, setEdit] = React.useState<boolean>(false);

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
        action: (item: IRole) => {
          return (
            <div style={{ display: "flex" }}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  dispatch(destroyRole(item.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setEdit(true);
                  formik.setValues({
                    ...formik.values,
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    permissions: item.permissions.map((i) => i.id),
                  });
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
  const handleSubmit = (values: RolePayload) => {
    if (edit) {
      dispatch(updateRole(values));
    } else {
      dispatch(createRole(values));
    }
  };

  const formik = useFormik<RolePayload>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const reset = () => {
    formik.resetForm();
    setEdit(false);
  };

  return (
    <AdminLayout>
      <RoleForm formik={formik} reset={reset} edit={edit} />
      <div style={{ padding: 30 }}>
        <DataTable
          columnData={columns}
          rows={list.roles}
          onChange={handleTableChange}
          total={list.total}
          loading={list.status === "loading"}
        />
      </div>
    </AdminLayout>
  );
};

export default RolePage;
