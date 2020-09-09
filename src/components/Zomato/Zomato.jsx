import React from 'react'

const Zomato = (props) => {
  const [restaurants, setRestaurants] = React.useState([])

  React.useEffect(() => {
    console.log(props.lat, props.long)
    console.log(window.location)
    if (props.lat !== undefined && props.long !== undefined) {
      console.log('RUNNNING FETCH')
      fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${props.lat}&lon=${props.long}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'user-key': '802cf8c5fd3a11e515e11f7e1cd70b50',
          // 'lat': props.lat,
          // 'lon': props.long
        })
      })
        .then(res => res.json())
        .then(json => setRestaurants(json.nearby_restaurants))
        .catch(err => console.log(err))
    }
  }, [props.lat, props.long])
  return (
    <div>
      {
        restaurants.map((location, index) => {
          return (
            <div className="location-card" key={index}>
              {location.restaurant.name}
            </div>
          )
        })
      }
    </div>
  )
}
export default Zomato


// fetch('https://developers.zomato.com/api/v2.1/categories', {
//       method: 'GET',
//       headers: new Headers({
//         'user-key': '802cf8c5fd3a11e515e11f7e1cd70b50',
//         'lat': props.lat,
//         'lon': props.long
//       })
//     })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))