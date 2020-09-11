import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  Card,
  CircularProgress,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  media: {
    height: 345,
  },
  card: {
    maxWidth: 345,
    margin: "auto",
  },
});

const NASA = (props) => {
  const classes = useStyles();

  const [NASA_URL, setNASA_URL] = useState(
    "https://api.nasa.gov/planetary/earth/imagery"
  );
  const [key, setKey] = useState("aUYcj0GHGEp6FNA9OhPtKilnflH5WheAt9KlfozB");
  const [NASA_Img, setNASA_Img] = useState("");
  const [errorMessage, setErrorMessage] = useState(" ");

  const toInfinityAndBeyond = async () => {
    try {
      const infinity = await fetch(
        `${NASA_URL}?lon=${props.long}&lat=${props.lat}&api_key=${key}&date=2020-09-07`
      );
      console.log(infinity)
      if (infinity.ok === false) {
        throw Error(infinity.statusText);
      }
      const beyond = await infinity.blob();
      setNASA_Img(URL.createObjectURL(beyond));
    } catch (err) {
      console.log(err)
      setErrorMessage("Today's image is not available.");
    }
    // .then((res) => {
    //   if (!res.ok) {
    //     setErrorMessage("today's image is not available");
    //     throw Error(res.statusText);
    //   }
    //   return res.blob();
    // })
    // .then((nasa) => {
    //   setNASA_Img(URL.createObjectURL(nasa));
    // })
    // .catch((err) => console.error(err));
  };

  useEffect(() => {
    toInfinityAndBeyond();
    // return () => {
    //   cleanup
    // }
  }, [props.lat, props.long]);

  return (
    <Box className={classes.root}>
      {NASA_Img.length !== 0 ? (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={NASA_Img}
            src={NASA_Img}
            title="no image available"
          />
        </Card>
      ) : NASA_Img.length === 0 ? (
        <CircularProgress />
      ) : (
        <Alert severity="error">Oops! {errorMessage}</Alert>
      )}
    </Box>
  );
};

export default NASA;
