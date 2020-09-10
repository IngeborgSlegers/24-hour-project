import React, { useState, useEffect } from "react";

const Weather = (props) => {
  const [fetchURL, setFetchURL] = useState(
    `api.openweathermap.org/data/2.5/weather`
  );
  const [weather, setWeather] = useState(undefined);
  const [units, setUnits] = useState("imperial");
  const apiKey = "40f89b7a717e3d03adafe2918d6d4bc2";

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `http://${fetchURL}?lat=${props.lat}&lon=${props.long}&appid=${apiKey}&units=${units}`
      );
      const json = await response.json();
      setWeather(json);
    };
    fetchWeather();
  }, [units]);

  const switchUnits = () => {
    if (units === "metric"){
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  }

  return (
    <div>
      {weather && units === "metric" ? (
        <div>
          <h1>{weather.main.temp}&#8451;</h1>
          <h1>High: {weather.main.temp_max}&#8451;</h1>
          <h1>Low: {weather.main.temp_min}&#8451;</h1>
          <button onClick={switchUnits}>Switch Units</button>
        </div>
      ) : weather && units === "imperial" ? (
        <div>
          <h1>{weather.main.temp}&#8451;</h1>
          <h1>High: {weather.main.temp_max}&#8451;</h1>
          <h1>Low: {weather.main.temp_min}&#8451;</h1>
          <button onClick={switchUnits}>Switch Units</button>
        </div>
      ) : <h1>Loading...</h1>}
    </div>
  );
};

export default Weather;
