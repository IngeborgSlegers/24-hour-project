import React from 'react';
import NASA from './components/NASA/NASA';

import './App.css';
import Zomato from './components/Zomato/Zomato';
import Weather from './components/Weather/Weather';

function App() {
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  React.useEffect(() => {

    navigator.geolocation.getCurrentPosition(location => { setLatitude(location.coords.latitude.toFixed(2)); setLongitude(location.coords.longitude.toFixed(2)) }, fail => console.log('you arent real'))
  }, [latitude, longitude])
  return (
    <div className="App">
      {
        latitude && longitude 
        ? 
        <div>
        <NASA lat={latitude} long={longitude}/>
        <Zomato lat={latitude} long={longitude} />
        <Weather lat={latitude} long={longitude} />
        </div>
        :
        <></>
      }
    </div>
  );
}

export default App;
