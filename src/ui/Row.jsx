function Row({ type = "vertical", children }) {
  return (
    <div
      className={`flex flex-wrap gap-4 ${
        type === "vertical" ? "flex-col gap-4" : ""
      } ${type === "horizontal" ? "items-center justify-between" : ""}`}
    >
      {children}
    </div>
  );
}

export default Row;
