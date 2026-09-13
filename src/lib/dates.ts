const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return formatter.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
