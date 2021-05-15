const formate = async () => {
  const data = await fetch("https://api.covid19api.com/countries");
  const result = data.json();
  return result;
};
export default formate;
