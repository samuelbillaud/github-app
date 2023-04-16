enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

const intervals: { [key: number]: [string, string] } = {
  [Weekday.Monday]: ['a', 'e'],
  [Weekday.Tuesday]: ['f', 'j'],
  [Weekday.Wednesday]: ['k', 'o'],
  [Weekday.Thursday]: ['p', 't'],
  [Weekday.Friday]: ['u', 'z'],
};

const getPoint = ([start, end]: [string, string], firstLetter: string) => {
  return start <= firstLetter && firstLetter <= end ? 1 : 0;
};

export const calculateAuthorNameScore = (author: string): number => {
  const dayOfWeek = new Date().getDay();
  const firstLetter = author[0].toLowerCase();

  if (dayOfWeek <= Weekday.Friday) {
    const interval = intervals[dayOfWeek];
    return getPoint(interval, firstLetter);
  }

  return 0;
};
