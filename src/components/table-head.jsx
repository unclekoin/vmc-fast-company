import React from 'react';

const TableHead = () => {
  const columnTitles = [
    'Имя',
    'Качества',
    'Профессия',
    'Встретился, раз',
    'Оценка',
    'Избранное',
    '',
  ];

  const tableHead = columnTitles.map((title, i) => (
    <th key={columnTitles.length - i} scope="col">
      {title}
    </th>
  ));

  return <>{tableHead}</>;
};

export default TableHead;
