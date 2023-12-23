function ButtonIcon({ children, ...props }) {
  return (
    <button
      {...props}
      className="rounded p-1.5 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-brand-600"
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
