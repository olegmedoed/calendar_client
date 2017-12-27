export const BEGINNING = 8 * 60;
export const HOUR = 60;
export const WORK_DURATION = (17 - 8) * HOUR;
export const HALF_DAY = BEGINNING + WORK_DURATION / 2;

export function timeToNumber(time) {
  const r = /(\d{2}):(\d{2})/;
  let [t, hours, minutes] = r.exec(time);

  hours = hours | 0;
  minutes = minutes | 0;

  time = hours * HOUR + minutes;

  return time < BEGINNING || time >= BEGINNING + WORK_DURATION
    ? -1
    : time - BEGINNING;
}

export function numberToTimeString(n) {
  const hours = (n / 60) | 0;
  const minutes = n % 60;

  return hours + ":" + (minutes || "00");
}
