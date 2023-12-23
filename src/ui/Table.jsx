import { useContext, createContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="rounded-lg border border-gray-200 bg-gray-0 text-sm dark:border-gray-700 dark:bg-gray-850"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`grid ${columns} items-center gap-2 rounded-t-lg border-b border-gray-100 bg-gray-50 px-3 py-4 font-semibold text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300`}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`grid ${columns} items-center gap-2 border-b border-gray-100 px-3 py-6 last:border-0 dark:border-gray-800`}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return <p className="m-6 text-center text-base">اطلاعاتی وجود ندارد</p>;

  return <section className="my-1">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="flex justify-center rounded-b-lg bg-gray-50 p-3 dark:bg-gray-900 [&:not(&:has(*))]:hidden">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
