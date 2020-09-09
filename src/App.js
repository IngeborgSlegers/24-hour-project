import React from 'react';
import NASA from './components/NASA/NASA';

import './App.css';
import Zomato from './components/Zomato/Zomato';

function App() {
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  React.useEffect(() => {

    navigator.geolocation.getCurrentPosition(location => { setLatitude(location.coords.latitude); setLongitude(location.coords.longitude) }, fail => console.log('you arent real'))
  }, [latitude, longitude])
  return (
    <div className="App">
      <NASA lat={latitude} long={longitude}/>
      <Zomato lat={latitude} long={longitude} />
    </div>
  );
}

export default App;
