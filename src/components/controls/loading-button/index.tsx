import { Button, CircularProgress, ButtonProps } from "@mui/material";
import * as React from "react";

//   import { createStyles, makeStyles } from "@mui/styles";

//   const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     button: {
//         margin: theme.spacing.unit,
//         paddingLeft: theme.spacing.unit
//       },

//       input: {
//         display: 'none',
//       },

//       circularProgress: {
//         marginLeft: 0,
//         marginRight: theme.spacing.unit,
//       },
//   })

interface ILoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton: React.FC<ILoadingButtonProps> = ({
  loading,
  ...restProps
}) => {
  return (
    <div>
      <Button variant="contained" disabled={loading} {...restProps}>
        {loading && <CircularProgress size={20} />}
        {restProps.children}
      </Button>
    </div>
  );
};

export default LoadingButton;
