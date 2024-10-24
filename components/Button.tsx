// writing or accepting each prop one by one for button
// we can create attribute like this which provided by react itself.

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      // extract properties like these
      className,
      children,
      disabled,
      type = "button",
      // and rest of all props / properties
      ...props
    },
    ref
  ) =>
    // then return a function in that a button
    {
      return (
        <button
          // all the default styling directly applied to the Button component
          type={type}
          className={twMerge(
            `
            w-full
            rounded-full
            bg-green-500
            border
            border-transparent
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-black
            font-bold
            hover:opacity-75
            transition
            `,
            // this className is basically for if we need more styling then ,
            // we can add by using this props
            className
          )}
          // and all remaining props get passed
          disabled={disabled}
          ref={ref}
          {...props}
        >
            {/* video start from 43:30 */}
          {children}
        </button>
      );
    }
);

Button.displayName = "Button";

export default Button;
