import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PaperCard({ children, className = "" }: Props) {
  return (
    <div className={`paper-card relative p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}
