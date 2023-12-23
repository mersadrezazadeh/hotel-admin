import { forwardRef } from "react";

const FileInput = forwardRef(function FileInput({ ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      type="file"
      className="w-full text-sm text-gray-700 focus:outline-brand-500 disabled:opacity-50 dark:text-gray-200"
    />
  );
});

export default FileInput;
