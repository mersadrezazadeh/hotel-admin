function DataItem({ icon, label, children }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span
        className={`flex items-center gap-2 font-medium xs:gap-4 ${
          !icon.props.className
            ? "[&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-brand-600"
            : ""
        }`}
      >
        {icon}
        <span className="whitespace-nowrap">{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
