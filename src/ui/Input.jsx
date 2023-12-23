import { forwardRef } from "react";

const Input = forwardRef(function Input({ ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className="rounded border border-gray-300 bg-gray-0 px-3 py-2 text-gray-700 shadow-sm focus:outline-brand-500 disabled:opacity-50 dark:border-gray-600  dark:bg-gray-850 dark:text-gray-200"
    />
  );
});

export default Input;
