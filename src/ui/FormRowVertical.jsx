function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2 py-3">
      {label && (
        <label
          htmlFor={children.props.id}
          className="font-medium text-gray-700 dark:text-gray-100"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
