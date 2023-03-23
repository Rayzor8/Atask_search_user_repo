import { ReactNode } from "react";

type LoaderProps = {
  children: ReactNode;
  color: "red" | "blue";
};

const Loader = ({ children, color }: LoaderProps) => {
  return <p className={`text-${color}-400 font-bold`}>{children}</p>;
};

export default Loader;
