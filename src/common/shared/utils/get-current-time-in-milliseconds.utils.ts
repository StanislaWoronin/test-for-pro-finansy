export const getCurrentTimeInMilliseconds = () => {
  const currentTimeUTC = new Date().toUTCString();
  return new Date(currentTimeUTC).getTime();
};
