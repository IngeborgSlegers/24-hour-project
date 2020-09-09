import React, {useState, useEffect} from 'react'

const NASA = (props) => {
  const [NASA_URL, setNASA_URL] = useState('https://api.nasa.gov/planetary/earth/imagery');
  const [key, setKey] = useState('aUYcj0GHGEp6FNA9OhPtKilnflH5WheAt9KlfozB');
  const [NASA_Img, setNASA_Img] = useState('');
  // console.log(NASA_Img);

  const toInfinityAndBeyond = () => {
    console.log('its alive');
    console.log(props);
    fetch(`${NASA_URL}?lon=-95.33&lat=29.78&date=2018-01-01&api_key=${key}`)
      .then(res => {
        console.log(res)        
        return res.blob()
      })
      .then(nasa => {
        console.log('this works')
        console.log(nasa)
        setNASA_Img(URL.createObjectURL(nasa))
      })
  }

  useEffect(() => {
    toInfinityAndBeyond();
    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    <div>
      <img src={NASA_Img} />
    </div>
  )
}

export default NASA
