const today = () => {
  let date = new Date();
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "numeric" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const today = year + "-" + month + "-" + day;
  return today;
};
const earlier = (days) => {
  let date = new Date();
  let last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  const day = last.toLocaleString("default", { day: "2-digit" });
  const month = last.toLocaleString("default", { month: "numeric" });
  const year = last.toLocaleString("default", { year: "numeric" });
  const formatedDate = year + "-" + month + "-" + day;
  return formatedDate;
};
const custom = (date) => {
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "numeric" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const customDate = year + "-" + month + "-" + day;
  return customDate;
};
export { today, earlier, custom };
