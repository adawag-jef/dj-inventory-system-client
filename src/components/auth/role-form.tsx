/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Theme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { FormikProps } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { listPermissions, selectRole } from "../../features/role/roleSlice";
import { RolePayload } from "../../interfaces";
import LoadingButton from "../controls/loading-button";

interface IRoleForm {
  formik: FormikProps<RolePayload>;
  edit?: boolean;
  reset: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const RoleForm: React.FC<IRoleForm> = ({ formik, edit, reset }) => {
  const dispatch = useAppDispatch();
  const { create, update, permissionList } = useAppSelector(selectRole);

  React.useEffect(() => {
    dispatch(listPermissions(null));
  }, []);

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

  const permissionError =
    (formik.touched.permissions && formik.errors.permissions) ||
    (update.error?.permissions && update.error?.permissions[0]) ||
    (create.error?.permissions && create.error?.permissions[0]);

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

            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="permissions" error={!!permissionError}>
                Permissions
              </InputLabel>
              <Select
                labelId="permissions"
                id="permissions"
                multiple
                fullWidth
                required
                name="permissions"
                value={formik.values.permissions}
                onChange={formik.handleChange}
                input={<OutlinedInput label="Name" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          permissionList.permissions?.find(
                            (perm) => perm.id === value
                          )?.title
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                error={
                  (formik.touched.permissions &&
                    Boolean(formik.errors.permissions)) ||
                  update.error?.permissions ||
                  create.error?.permissions
                }
              >
                {permissionList.permissions?.map((perm) => (
                  <MenuItem key={perm.id} value={perm.id}>
                    {perm.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{permissionError}</FormHelperText>
            </FormControl>

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

export default RoleForm;
