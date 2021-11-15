import { useEffect, useState } from "react";
import httpService from "../services/http.service";
import professions from "../mock-data/professions.json";
import qualities from "../mock-data/qualities.json";
import users from "../mock-data/users.json";

const UseMockData = () => {
  const statusConstants = {
    idle: "Не начато",
    pending: "В процессе",
    successes: "Готово",
    error: "Ошибка передачи данных"
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConstants.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const sumRequests = professions.length + qualities.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count && status === statusConstants.idle) {
      setStatus(statusConstants.pending);
    }
    const newProgress = Math.floor((count / sumRequests) * 100);
    if (progress < newProgress) setProgress(() => newProgress);
    if (newProgress === 100) setStatus(statusConstants.successes);
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  const init = async () => {
    try {
      for (const profession of professions) {
        await httpService.put(`profession/${profession._id}`, profession);
        incrementCount();
      }
      for (const quality of qualities) {
        await httpService.put(`quality/${quality._id}`, quality);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConstants.error);
    }
  };

  return { error, init, progress, status };
};

export default UseMockData;
