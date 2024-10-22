import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge("")}>
        {/* video start from 16:50 */}
        {children}
    </div>
  );
};

export default Box;
