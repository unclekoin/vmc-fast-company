import React from "react";
import PropTypes from "prop-types";
import Table, { TableHeader, TableBody } from "../common/table";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Name from "../name";

const UsersTable = ({
  users,
  onDelete,
  onToggeleBookMark,
  onSort,
  selectedSort
}) => {
  const columns = {
    // name: { path: "name", name: "Имя" },
    name: {
      name: "Имя",
      path: "name",
      component: (user) => <Name name={user.name} id={user._id} />
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark
          onToggeleBookMark={onToggeleBookMark}
          id={user._id}
          status={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Удалить
        </button>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    >
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggeleBookMark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
