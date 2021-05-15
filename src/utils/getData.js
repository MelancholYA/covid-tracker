const getData = async (url) => {
  try {
    const data = await fetch(url);
    const result = await data.json();
    if (Array.isArray(result)) {
      if (result[0].hasOwnProperty("Confirmed")) {
        result.forEach((country) => {
          country.NewConfirmed = country.Confirmed;
          country.NewDeaths = country.Deaths;
          country.NewRecovered = country.Recovered;
        });
      }
      return result;
    } else {
      return { error: true, message: "Error while fetching data" };
    }
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
