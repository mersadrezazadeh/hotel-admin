import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea({ ...props }, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className="h-20 w-full rounded border border-gray-300 bg-gray-0 px-2 py-3 text-gray-700 shadow-sm focus:outline-brand-500 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-850 dark:text-gray-200"
    />
  );
});

export default Textarea;
