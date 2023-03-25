const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getMonth = (date: Date) => {
  return months[date.getMonth()];
};

export const getMonthAndYear = (date: Date) => {
  return `${getMonth(date)} ${date.getFullYear()}`;
};

export const getDate = (date: Date) => {
  return `${getMonth(
    date
  )} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
