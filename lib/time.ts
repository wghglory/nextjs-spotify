export function millisecondToMinutesAndSeconds(millisecond: number) {
  const minutes = Math.floor(millisecond / 60000);
  const seconds = Math.round((millisecond & 60000) / 1000);
  return seconds == 60 ? minutes + 1 + ':00' : minutes + ':' + (seconds < 10 ? 'O' : '') + seconds;
}
