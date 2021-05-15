import { useState } from "react";
import Search from "../componants/Search";
import Date from "../componants/Date";
const Header = () => {
  const [countries, showCountries] = useState(false);
  const [datePicker, showDatePicker] = useState(false);
  const windowWidth = window.screen.width;
  return (
    <header className='header'>
      <div className='header__container'>
        <h1 className='header__logo'>Covid Tracker</h1>
        <nav className='header__nav'>
          <button
            onClick={() => {
              showCountries(!countries);
              showDatePicker(false);
            }}>
            Choose Country
          </button>
          <button
            onClick={() => {
              showDatePicker(!datePicker);
              showCountries(false);
            }}>
            Pick the duration
          </button>
        </nav>
      </div>
      <div
        style={{
          height: countries ? "calc(100vh - 100px)" : "0",
        }}
        className='animated'>
        {countries && <Search disable={showCountries} />}
      </div>
      <div
        style={{
          height: datePicker ? (windowWidth < 600 ? 400 : 90) : 0,
        }}
        className='animated'>
        {datePicker && <Date disable={showDatePicker} />}
      </div>
    </header>
  );
};

export default Header;
