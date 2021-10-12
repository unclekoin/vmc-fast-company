import React from "react";
import Proptypes from "prop-types";
import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: Proptypes.func,
  selectedSort: Proptypes.object,
  columns: Proptypes.object,
  data: Proptypes.array,
  children: Proptypes.array
};

export default Table;
