export const calculateDayDelta = (d1: Date, d2: Date) => {
  const startDate = new Date(d1);
  const endDate = new Date(d2);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.abs(dayDifference);
}

export const formatDate = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day: string = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getYesterday = (): string => {
  const yesterday: Date = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDate(yesterday);
}

export const getToday = (): string => {
  const today: Date = new Date();
  return formatDate(today);
}
