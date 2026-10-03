export function formatDate(date: string) {
  return new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Stockholm' }).format(new Date(date));
}
export function pageNumber(value: string | string[] | undefined) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : 1;
}
