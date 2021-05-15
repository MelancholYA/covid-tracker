import countries from "../utils/countries.json";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EDIT } from "../Redux/Action";
import { today, earlier } from "../utils/dateFormater";
const Search = ({ disable }) => {
  // the countries list and search functionality
  //i fetched the country list from the same api and then saved them in a json array so i load them faster .
  const [toShow, setToShow] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const arr = countries.map(function (country) {
      return { ...country, Country: country.Country.toLowerCase() };
    });
    setToShow(arr);
  }, []);
  const searchCountry = (e) => {
    // changing the country names into lower case so the search would be functional
    const input = e.target.value.toLowerCase();
    const arr = countries.map((country) => country.Country.toLowerCase());

    if (input.length !== 0) {
      const newArr = arr.map((country) => {
        if (country.Country.match(input)) {
          return country;
        }
        return null;
      });
      setToShow(newArr);
    }
  };
  const updateUrl = (country) => {
    const url = `https://api.covid19api.com/country/${country}?from=${earlier(
      15
    )}T00:00:00Z&to=${today()}T00:00:00Z`;
    const Linkstate = {
      country: country,
      url,
      period: undefined,
    };
    dispatch(EDIT(Linkstate));
    disable(false);
  };
  return (
    <div className='countries'>
      <header className='countries__header'>
        <div className='countries__header__search'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
          </svg>
          <input
            onChange={(e) => searchCountry(e)}
            type='text'
            placeholder='start typing your country name...'
          />
        </div>
        <button onClick={() => disable(false)}></button>
      </header>
      <div className='countries__container'>
        <ul>
          {toShow ? (
            toShow
              .filter((country) => country.Country !== null)
              .map((country, i) => (
                <li
                  key={i}
                  className='counries__container__country'
                  onClick={() => updateUrl(country.Slug)}>
                  {country.Country}
                </li>
              ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
