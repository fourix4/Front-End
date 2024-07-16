export const getTime = (date: Date) => {
  const hour = date.getHours();
  const minute = String(date.getMinutes());

  return `${hour} : ${minute.padStart(2, '0')}`;
};

export const dateTo8Digit = (year: number, month: number, date: number) => {
  let result = `${year}`;

  result += `${month < 10 ? '0' : ''}${month}`;
  result += `${date < 10 ? '0' : ''}${date}`;

  return +result;
};

export const getEndTime = (startTime: string, duration: number) => {
  const [hour, min] = startTime.split(':');
  let newHour = +hour + duration;

  newHour = newHour >= 24 ? newHour - 24 : newHour;

  return `${newHour >= 10 ? newHour : `0${newHour}`}:${min}`;
};
