import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [latitude, setLatitude] = React.useState('')
  const [longitude, setLongitude] = React.useState('')
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => { setLatitude(location.coords.latitude); setLongitude(location.coords.longitude) }, fail => console.log('you arent real'))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
