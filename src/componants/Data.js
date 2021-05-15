import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { custom } from "../utils/dateFormater";
import fetchData from "../utils/getData";
import Slider from "react-slick";

// the main body for data displaying
const Data = () => {
  // get the states from redux store
  const url = useSelector((state) => state.url);
  const country = useSelector((state) => state.country);
  const period = useSelector((state) => state.period);

  //define the states for this componant
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  // getting the width of the screen to adjust how many items should be displayed in the sdlider
  const width = window.screen.width;

  // slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: width < 820 ? 1 : 2,
    slidesToScroll: 1,
  };
  useEffect(() => {
    //fetching data from the api
    const merge = async () => {
      setLoading(true);
      const data = await fetchData(url);
      if ("error" in data) {
        setErrors({ message: '"Something went wrong"', error: data.message });
        setLoading(false);
        return;
      }
      if (data.length === 0) {
        setErrors({
          message: "Something went wrong",
          error: "No data are available in this moment",
        });
        setLoading(false);
        return;
      }
      data.map((elm) => (elm.Date = new Date(elm.Date.slice(0, 10))));
      const sortedArr = data.sort((a, b) => b.Date - a.Date).reverse();
      setData(sortedArr);
      setErrors(false);
      setLoading(false);
    };
    merge();
  }, [url]);
  if (errors)
    return (
      <div className='error'>
        <div className='popUp'>
          <h1>{errors.message}</h1>
          <code>{errors.error}</code>
        </div>
      </div>
    );
  if (loading)
    return (
      <div className='data'>
        <div className='data__today'>
          <h2 className='data__today__title'>Today Statics</h2>
          <div className='data__today__body'>
            <div className='data__today__body--confirmed'>
              <h4>New Confirmed</h4>
              <h2>Loading...</h2>
            </div>
            <div className='data__today__body--recovered'>
              <h4>New Recovered</h4>
              <h2>Loading...</h2>
            </div>
            <div className='data__today__body--deaths'>
              <h4>New Deaths</h4>
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
        <div className='data__past'>
          <h2 className='data__past__title'>Loading ...</h2>
          <div className='data__past__body'>
            <Slider {...settings}>
              <div className='data__past__body__part'>
                <h4 className='data__past__body__part--title'>Loading...</h4>
                <div className='data__past__body__part__body'>
                  <p className='data__past__body__part__body--confirmed'>
                    Confirmed : Loading...
                  </p>
                  <p className='data__past__body__part__body--recovered'>
                    Recovered : Loading...
                  </p>
                  <p className='data__past__body__part__body--deaths'>
                    Deaths : Loading...
                  </p>
                </div>
              </div>
              <div className='data__past__body__part'>
                <h4 className='data__past__body__part--title'>Loading...</h4>
                <div className='data__past__body__part__body'>
                  <p className='data__past__body__part__body--confirmed'>
                    Confirmed : Loading...
                  </p>
                  <p className='data__past__body__part__body--recovered'>
                    Recovered : Loading...
                  </p>
                  <p className='data__past__body__part__body--deaths'>
                    Deaths : Loading...
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  return (
    <div className='data'>
      <div className='data__today'>
        <h2 className='data__today__title'>
          last Statics - {country ? country : "World Wide"}{" "}
        </h2>
        <div className='data__today__body'>
          <div className='data__today__body--confirmed'>
            <h4>New Confirmed</h4>
            <h2>{data[data.length - 1].NewConfirmed}</h2>
          </div>
          <div className='data__today__body--recovered'>
            <h4>New Recovered</h4>
            <h2>{data[data.length - 1].NewRecovered}</h2>
          </div>
          <div className='data__today__body--deaths'>
            <h4>New Deaths</h4>
            <h2>{data[data.length - 1].NewDeaths}</h2>
          </div>
        </div>
      </div>
      <div className='data__past'>
        <h2 className='data__past__title'>
          Statistics for
          {period ? ` the Period between ${period}` : " the Last 15 days"}
        </h2>
        <div className='data__past__body'>
          <Slider {...settings}>
            {data.length !== 0 &&
              data.map((info, i) => (
                <div key={i} className='data__past__body__part'>
                  <h4 className='data__past__body__part--title'>
                    {custom(info.Date)}
                  </h4>
                  <div className='data__past__body__part__body'>
                    <p className='data__past__body__part__body--confirmed'>
                      Confirmed : {info.NewConfirmed}
                    </p>
                    <p className='data__past__body__part__body--recovered'>
                      Recovered : {info.NewRecovered}
                    </p>
                    <p className='data__past__body__part__body--deaths'>
                      Deaths : {info.NewDeaths}
                    </p>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Data;
