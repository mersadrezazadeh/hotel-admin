function ButtonText({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded text-center font-medium text-brand-600 transition-all duration-300 hover:text-brand-700"
    >
      {children}
    </button>
  );
}

export default ButtonText;
