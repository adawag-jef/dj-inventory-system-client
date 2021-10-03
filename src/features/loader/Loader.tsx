import React from "react";
import { useAppSelector } from "../../app/hooks";
import { loaderSelector } from "./loaderSlice";

interface ILoaderProps {}

const Loader: React.FC<ILoaderProps> = ({ children }) => {
  const { status } = useAppSelector(loaderSelector);

  if (status === "loading") {
    return <h2>Please Wait...</h2>;
  }

  if (status === "failed") {
    return (
      <>
        <h2>Error! Something went wrong.</h2>
        {children}
      </>
    );
  }

  return <>{children}</>;
};

export default Loader;
