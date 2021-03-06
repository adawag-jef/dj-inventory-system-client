import { Button, Paper, Stack, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { FormikProps } from "formik";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectPermission } from "../../features/permission/permissionSlice";
import { PermissionPayload } from "../../interfaces";
import LoadingButton from "../controls/loading-button";

interface IPermissionForm {
  formik: FormikProps<PermissionPayload>;
  edit?: boolean;
  reset: () => void;
}

const PermissionForm: React.FC<IPermissionForm> = ({ formik, edit, reset }) => {
  const { create, update } = useAppSelector(selectPermission);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        padding: 30,
      },
      paper: {
        width: "100%",
        padding: 10,
      },

      spaceTop: {
        marginTop: 16,
      },
    })
  );

  const classes = useStyles();

  const loading = create.status === "loading" || update.status === "loading";

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formik.values.title}
              onChange={formik.handleChange}
              error={
                (formik.touched.title && Boolean(formik.errors.title)) ||
                update.error?.title ||
                create.error?.title
              }
              helperText={
                (formik.touched.title && formik.errors.title) ||
                (update.error?.title && update.error?.title[0]) ||
                (create.error?.title && create.error?.title[0])
              }
            />
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              multiline
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                (formik.touched.description &&
                  Boolean(formik.errors.description)) ||
                update.error?.description ||
                create.error?.description
              }
              helperText={
                (formik.touched.description && formik.errors.description) ||
                (update.error?.description && update.error?.description[0]) ||
                (create.error?.description && create.error?.description[0])
              }
            />

            <Stack spacing={2} direction="row" className={classes.spaceTop}>
              <LoadingButton loading={loading} type="submit">
                {edit ? "Update" : "Save"}
              </LoadingButton>
              {edit && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </Box>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default PermissionForm;
