export default (number: number) => {
  const mins = Math.floor(number / 60);
  const secs = new Number((number % 60).toFixed());
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};