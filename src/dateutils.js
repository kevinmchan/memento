import regeneratorRuntime from "regenerator-runtime";

const addDays = (date, days) => (
    new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    )
)

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
    while (nextDay.getMonth() <= month) {
        yield nextDay;
        nextDay = addDays(nextDay, 7);
    }
};

export { addDays, firstDayOfWeeksInMonth };