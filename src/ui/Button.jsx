const sizes = {
  small: `px-2 py-1.5 text-center text-xs font-semibold uppercase`,
  medium: `px-4 py-3 text-sm font-medium`,
  large: `px-6 py-3 text-base font-medium`,
};

const variations = {
  primary: `bg-brand-600 text-brand-50 hover:bg-brand-700`,
  secondary: `border border-gray-200 bg-gray-0 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-850 dark:text-gray-300 dark:hover:bg-gray-900`,
  danger: `bg-red-700 text-red-100 hover:bg-red-800`,
};

function Button({
  size = "medium",
  variation = "primary",
  type,
  onClick,
  disabled,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded shadow-lg transition-all duration-300 disabled:opacity-50 ${
        size === "small" ? sizes.small : ""
      }
      ${size === "medium" ? sizes.medium : ""} ${
        size === "large" ? sizes.large : ""
      } ${variation === "primary" ? variations.primary : ""} ${
        variation === "secondary" ? variations.secondary : ""
      } ${variation === "danger" ? variations.danger : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
