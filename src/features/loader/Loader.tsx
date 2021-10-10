// import React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Fade from "@mui/material/Fade";
// import LinearProgress from "@mui/material/LinearProgress";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

interface ILoaderProps {}

const Loader: React.FC<ILoaderProps> = ({ children }) => {
  const {
    auth: { error, status },
  } = useAppSelector((state: RootState) => state);

  // if (status === "loading") {
  //   return <LoaderModal status={status} />;
  // }

  if (status === "failed") {
    return (
      <>
        <h2>{error?.detail}</h2>

        {children}
      </>
    );
  }

  return <>{children}</>;
};

export default Loader;

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// interface ILoaderModalProps {
//   status: "loading" | "failed" | "idle";
// }

// const LoaderModal: React.FC<ILoaderModalProps> = ({ status }) => {
//   const [open, setOpen] = React.useState<boolean>(false);
//   React.useEffect(() => {
//     switch (status) {
//       case "failed":
//       case "idle":
//         setOpen(false);
//         break;
//       case "loading":
//         setOpen(true);
//         break;
//       default:
//         setOpen(false);
//     }
//   }, [status]);
//   return (
//     <div>
//       <Modal
//         open={open}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <LinearProgress />
//             <Typography>Loading...</Typography>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// };

// export default function Loader({open}): React.FC<ILoaderProps> {
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <LinearProgress />
//             <Typography>
//               Loading
//             </Typography>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }
