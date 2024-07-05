const getTime = (date: Date) => {
  const hour = date.getHours();
  const minute = String(date.getMinutes());

  return `${hour} : ${minute.padStart(2, '0')}`;
};

export default getTime;
