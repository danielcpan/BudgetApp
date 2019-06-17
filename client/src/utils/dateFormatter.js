/* eslint-disable import/prefer-default-export */

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const format = (date) => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const monthNumber = (1 + dateObj.getMonth()).toString().padStart(2, '0');
  const month = monthNames[monthNumber - 1];
  const day = dateObj.getDate().toString().padStart(2, '0');

  return `${month} ${day}, ${year}`;
};
