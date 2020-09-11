import React, { useState, useEffect } from "react";
import {

  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

const Weather = (props) => {
  const [fetchURL, setFetchURL] = useState(
    `api.openweathermap.org/data/2.5/weather`
  );
  const [weather, setWeather] = useState(undefined);
  const [units, setUnits] = useState("imperial");
  const apiKey = "40f89b7a717e3d03adafe2918d6d4bc2";

  const weatherToggle = () => {
    
  }

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
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={4}></Grid>
      {weather && units === "metric" ? (
        <Grid item xs={4}>
          <Paper>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h3">{Math.floor(weather.main.temp)}&#8451;</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">High: {Math.floor(weather.main.temp_max)}&#8451;</Typography>
                <Typography variant="body1">Low: {Math.floor(weather.main.temp_min)}&#8451;</Typography>
              </Grid>
            </Grid>
            <Button onClick={switchUnits}>Switch Units</Button>
          </Paper>
        </Grid>
      ) : weather && units === "imperial" ? (
        <Grid item xs={12} sm={4}>
          <Paper>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h3">{Math.floor(weather.main.temp)}&#8457;</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='body1'>High: {Math.floor(weather.main.temp_max)}&#8457;</Typography>
                <Typography variant='body1'>Low: {Math.floor(weather.main.temp_min)}&#8457;</Typography>
              </Grid>
            </Grid>
            <Button onClick={switchUnits}>Switch Units</Button>
          </Paper>
        </Grid>
      ) : <Typography variant="h1">Loading...</Typography>}
      <Grid item xs={12} sm={4}></Grid>
    </Grid>
  );
};

export default Weather;
