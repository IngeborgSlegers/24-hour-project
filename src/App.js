import React from "react";
import NASA from "./components/NASA/NASA";
import Zomato from "./components/Zomato/Zomato";
import Weather from './components/Weather/Weather';
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white",
    textShadow: "0.1em 0.1em black"
  },
  accordianDetails: {
    display: "block"
  },
  title: {
    margin: "2em 2.5em" 
  },
  color: {
    backgroundColor: "grey"
  }
}));

function App() {
  const classes = useStyles();

  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      },
      (fail) => console.log("you arent real")
    );
  }, [latitude, longitude]);


  return (
    <div className="App">
      <Typography variant="h3" className={classes.title}>24-HOUR PROJECT</Typography>
      {latitude && longitude ? (
        <div className={classes.root}>
          <Accordion className={classes.color}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>NASA</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordianDetails}>
              <NASA lat={latitude} long={longitude} />
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.color}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Restaurants</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Zomato lat={latitude} long={longitude} />
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.color}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Weather</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Weather lat={latitude} long={longitude} />
            </AccordionDetails>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
}

export default App;
