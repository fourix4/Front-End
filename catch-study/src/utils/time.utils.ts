export const getChatTime = (date: Date) => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const minute = String(newDate.getMinutes());

  return `${hour} : ${minute.padStart(2, '0')}`;
};

export const getDateFullFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
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

export const getCurrentTime = () => {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export const getInputFormatTime = (
  year: number,
  month: number,
  date: number,
) => {
  let result = `${year}`;

  result += '-';
  result += `${month < 10 ? '0' : ''}${month}`;
  result += '-';
  result += `${date < 10 ? '0' : ''}${date}`;

  return result;
};
