import { ReactNode } from "react";

interface VisibleProps {
  when: boolean | number;
  otherwise?: ReactNode;
  children: ReactNode;
}

const Visible = ({ when, otherwise = null, children }: VisibleProps) => {
  return when ? <>{children}</> : <>{otherwise}</>;
};

export default Visible;
