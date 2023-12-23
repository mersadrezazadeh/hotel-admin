function FormRow({ type, label, error, children }) {
  return (
    <div
      className={`grid items-center gap-4 border-b border-gray-100 py-1 first:pt-0 last:border-0 last:pb-0 dark:border-gray-800 xs:gap-6 xs:py-3 lg:grid-cols-[1fr,1fr,1.2fr] [&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-3 ${
        type === "modal"
          ? "grid-cols-[1fr,150px,60px]"
          : "grid-cols-[100px,max(1fr),1fr] xs:grid-cols-[100px,1fr,1fr]"
      }`}
    >
      {label && (
        <label
          htmlFor={children.props.id}
          className="font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-[10px] text-red-700 xs:text-sm">{error}</span>
      )}
    </div>
  );
}

export default FormRow;
