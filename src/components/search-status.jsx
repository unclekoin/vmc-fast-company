import React from 'react';

const renderPhrase = (number) => {
  
  if (!number) return 'Никто с тобой не тусанет';

  const tail = Number(String(number).slice(-1));

  const word =
    (number > 4 && number < 15) || ![2, 3, 4].includes(tail)
      ? 'человек'
      : 'человека';

  return `${number} ${word} ${
    tail === 1 ? 'тусанет' : 'тусанут'
  } с тобой сегодня`;
};

const SearchStatus = ({ length }) => {
  return (
    <h1 className="mb-4">
      <span className={`badge bg-${length ? 'primary' : 'danger'}`}>
        {renderPhrase(length)}
      </span>
    </h1>
  );
};

export default SearchStatus;
