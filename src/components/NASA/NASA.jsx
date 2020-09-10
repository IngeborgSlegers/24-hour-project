import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  Card,
  CardActionArea,
  Typography,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  media: {
    height: 345,
  },
  card: {
    maxWidth: 345,
    border: "1px black solid",
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

  const toInfinityAndBeyond = () => {
    fetch(
      `${NASA_URL}?lon=${props.long}&lat=${props.lat}&api_key=${key}&date=2020-09-01`
    )
      .then((res) => {
        if (!res.ok) {
          setErrorMessage("today's image is not available");
          throw Error(res.statusText);
        }
        return res.blob();
      })
      .then((nasa) => {
        setNASA_Img(URL.createObjectURL(nasa));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    toInfinityAndBeyond();
    // return () => {
    //   cleanup
    // }
  }, [props.lat, props.long]);

  return (
    <Box className={classes.root}>
      <Typography variant="h4">NASA</Typography>
      {errorMessage.length !== 0 || NASA_Img.length !== 0 ? (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={NASA_Img}
            src={NASA_Img}
            title="no image available"
          />
        </Card>
      ) : (
        <Alert severity="error">Oops {errorMessage}</Alert>
      )}
    </Box>
  );
};

export default NASA;
