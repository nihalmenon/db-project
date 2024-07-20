export const getAge = (dob: Date): number => {
  const ageDelta = new Date(Date.now() - dob.getTime());
  return Math.abs(ageDelta.getUTCFullYear() - 1970);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

export const toISODate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString();
};

export const dateToYMD = (date: Date): string => {
  const mArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = date.getDate();
  const m = mArray[date.getMonth()];
  const y = date.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + ' ' + m + ' ' + y;
}
