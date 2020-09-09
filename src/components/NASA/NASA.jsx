import React, { useState, useEffect } from "react";
import { CardMedia, Card } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert"

const NASA = (props) => {
  const [NASA_URL, setNASA_URL] = useState(
    "https://api.nasa.gov/planetary/earth/imagery"
  );
  const [key, setKey] = useState("aUYcj0GHGEp6FNA9OhPtKilnflH5WheAt9KlfozB");
  const [NASA_Img, setNASA_Img] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(NASA_Img);

  const toInfinityAndBeyond = async () => {
    fetch(
      `${NASA_URL}?lon=${props.long}&lat=${props.lat}&api_key=${key}&date=2020-01-01`
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
    <div>
      {errorMessage ? (
        <Card>
          <CardMedia
            image={NASA_Img}
            src={NASA_Img}
            title="no image available"
          />
        </Card>
      ) : (
        <Alert>${errorMessage}</Alert>
      )}
    </div>
  );
};

export default NASA;
