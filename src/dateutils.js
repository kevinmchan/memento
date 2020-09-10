// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

const addDays = (date, days) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

const firstDateInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
};

const firstDateOfFirstWeek = (date) => {
  const firstDate = firstDateInMonth(date);
  const day = firstDate.getDay();
  return addDays(firstDate, -day);
};

const firstDayOfWeeksInMonth = function* (date) {
  const month = date.getMonth();

  let nextDay = firstDateOfFirstWeek(date);
  const toContinue = (currentMonth, month) => {
    if (month === 0) {
      return currentMonth === 11 || currentMonth === 0;
    }
    if (month === 11) {
      return currentMonth === 10 || currentMonth === 11;
    }
    return currentMonth <= month;
  };

  while (toContinue(nextDay.getMonth(), month)) {
    yield nextDay;
    nextDay = addDays(nextDay, 7);
  }
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { addDays, firstDayOfWeeksInMonth, daysOfWeek, months };
