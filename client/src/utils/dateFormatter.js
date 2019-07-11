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
  const year = date.substr(0,4)
  const month = monthNames[parseInt(date.substr(5,2)) - 1]
  const day = date.substr(8,2)

  return `${month} ${day}, ${year}`;
};
