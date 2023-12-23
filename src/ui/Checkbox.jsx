function Checkbox({ id, disabled, children, ...props }) {
  return (
    <div className="flex gap-4">
      <input
        type="checkbox"
        disabled={disabled}
        {...props}
        className="h-6 w-6 accent-brand-600 outline-offset-2 transition-all duration-300"
      />
      <label
        htmlFor={!disabled ? id : ""}
        className="flex grow items-center gap-2"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
