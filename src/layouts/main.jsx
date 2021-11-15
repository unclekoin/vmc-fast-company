import React from "react";
import UseMockData from "../utils/mock-data";

const Main = () => {
  const { error, init, progress, status } = UseMockData();
  const handleClick = () => {
    init();
  };
  return (
    <div className="container mt-5">
      <h1>Главная страница</h1>
      <h3>Инициализация данных Firebase</h3>
      <ul>
        <li>Статус: {status}</li>
        <li>Прогресс: {progress}%</li>
        {error && <li>Ошибка: {error}</li>}
      </ul>
      <button onClick={handleClick} className="btn btn-primary">
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
