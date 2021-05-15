const getData = async (url) => {
  console.log(url);
  try {
    const data = await fetch(url);
    const result = await data.json();
    if (result.length === 0)
      return { error: true, message: "No Data were found " };
    if (result[0].hasOwnProperty("Confirmed")) {
      result.forEach((country) => {
        country.NewConfirmed = country.Confirmed;
        country.NewDeaths = country.Deaths;
        country.NewRecovered = country.Recovered;
      });
    }
    return result;
  } catch (error) {
    const errorMessage = {
      error: true,
      message: error,
    };
    console.log(errorMessage);
    return errorMessage;
  }
};
export default getData;
