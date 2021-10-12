/* eslint-disable react-hooks/exhaustive-deps */
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
  createPermission,
  updatePermission,
  deletePermission,
} from "../../features/permission/permissionSlice";
import PermissionForm from "../../components/auth/permission-form";
import { useFormik } from "formik";
import { IPermission, PermissionPayload } from "../../interfaces";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
});

const initialValues: PermissionPayload = {
  title: "",
  description: "",
};

const PermissionPage = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectPermission);
  const [edit, setEdit] = React.useState(false);

  const handleTableChange = React.useCallback((queryString: string = "") => {
    dispatch(fetchAllPermissions(queryString));
  }, []);

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
        action: (item: IPermission) => {
          return (
            <div style={{ display: "flex" }}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  dispatch(deletePermission(item.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  formik.setValues({
                    ...formik.values,
                    title: item.title,
                    description: item.description,
                    id: item.id,
                  });
                  setEdit(true);
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

  const handleSubmit = async (values: PermissionPayload) => {
    if (edit) {
      dispatch(await updatePermission(values));
    } else {
      dispatch(await createPermission(values));
    }
  };

  const formik = useFormik<PermissionPayload>({
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
      <PermissionForm formik={formik} edit={edit} reset={reset} />
      <div style={{ padding: 30 }}>
        <DataTable
          columnData={columns}
          rows={list.permissions}
          onChange={handleTableChange}
          total={list.total}
          loading={list.status === "loading"}
        />
      </div>
    </AdminLayout>
  );
};

export default PermissionPage;
