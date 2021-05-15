import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT } from "../Redux/Action";
import { today } from "../utils/dateFormater";
// the date form
const Date = ({ disable }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const countryState = useSelector((state) => state.country);
  const dispatch = useDispatch();
  const gotDate = async (e) => {
    e.preventDefault();
    if (!from || !to) return alert("Please Pick a date first");
    if (from >= today() || to >= today)
      return alert("Please chose a sutible date");
    let url;
    if (countryState) {
      url = `https://api.covid19api.com/country/${countryState}?from=${from}T00:00:00Z&to=${to}T00:00:00Z`;
    } else {
      url = `https://api.covid19api.com/world?from=${from}T00:00:00Z&to=${to}T00:00:00Z`;
    }
    const Linkstate = {
      country: countryState,
      url,
      period: ` ${from} and ${to}`,
    };
    dispatch(EDIT(Linkstate));
    disable(false);
  };

  return (
    <div className='date'>
      <form className='date__form' onSubmit={gotDate}>
        <label htmlFor='from'>
          From :
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label htmlFor='to'>
          To :
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <button className={!from || !to ? "disabled" : ""}>Submit</button>
      </form>
      <button className='dismis' onClick={() => disable(false)}></button>
    </div>
  );
};

export default Date;
