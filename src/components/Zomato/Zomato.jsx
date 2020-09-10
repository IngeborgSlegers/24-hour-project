import React from 'react'
import './Zomato.css'
import { Card, Grid, CardContent, Typography, CardActionArea } from '@material-ui/core'

const Zomato = (props) => {
  const [restaurants, setRestaurants] = React.useState([])

  React.useEffect(() => {
    console.log(props.lat, props.long)
    console.log(window.location)
    if (props.lat && props.long) {
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
        .then(json => {
          console.log(json)
          setRestaurants(json.nearby_restaurants)
        })
        .catch(err => console.log(err))
    }
  }, [props.lat, props.long])
  return (
    <Grid container>
      {
        restaurants.map((location, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ margin: '2.5%', backgroundColor: '#033a92', color: 'white'}}>
                <CardContent>
                  <Typography variant='h5'><a className='link-color' href={location.restaurant.photos_url} target='blank'>{location.restaurant.name}</a></Typography>
                  <hr />
                  <Grid container>
                    <Grid item xs={6} style={{ textAlign: 'left' }}>
                      <Typography variant='body1'>{location.restaurant.currency}{location.restaurant.average_cost_for_two} <br /> {location.restaurant.cuisines}</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <Typography variant="body2">rated {location.restaurant.user_rating.aggregate_rating} <br /> {location.restaurant.user_rating.votes} votes</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActionArea style={{marginBottom: '5%'}}>
                  <Typography variant="caption">{location.restaurant.location.address}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })
      }
    </Grid>
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