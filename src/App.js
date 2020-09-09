import React from 'react';
import logo from './logo.svg';
import './App.css';
import Zomato from './components/Zomato/Zomato';

function App() {
  const [latitude, setLatitude] = React.useState()
  const [longitude, setLongitude] = React.useState()
  React.useEffect(() => {
    (async function iifeMan() {
      await navigator.geolocation.getCurrentPosition(location => { setLatitude(location.coords.latitude); setLongitude(location.coords.longitude) }, fail => console.log('you arent real'))
    })();
  }, [])
  return (
    <div className="App">
      

      <Zomato lat={latitude} long={longitude} />
    </div>
  );
}

export default App;
