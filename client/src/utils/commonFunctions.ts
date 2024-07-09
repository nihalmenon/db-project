export const getAge = (dob: Date): number => {
  const ageDelta = new Date(Date.now() - dob.getTime());
  return Math.abs(ageDelta.getUTCFullYear() - 1970);
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};
