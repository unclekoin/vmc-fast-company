import _ from "lodash";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // return items.slice(startIndex, endIndex);

  return _(items).slice(startIndex).take(pageSize).value();
};
