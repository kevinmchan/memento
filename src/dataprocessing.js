const dateValue = ({ year, month, day }) => month * 10e6 + day * 10e4 + year;
const eventCompare = (a, b) => dateValue(a.date) - dateValue(b.date);
const processEvent = (event) => {
  const date = new Date(
    event.date.year,
    event.date.month,
    event.date.day,
    0,
    0,
    0,
    0
  );
  return { ...event, date };
};
const processEventList = (list) => list.sort(eventCompare).map(processEvent);

export { processEventList };
