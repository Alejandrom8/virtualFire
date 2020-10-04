const axios = require('axios').default

function filterByCategory (events) {
  return events.filter(event => {
    return event.categories.some(cat => cat.id === 'wildfires')
  })
}

function toRadians (val) {
  return val * Math.PI / 180
}

function getDistanceBetweenPoints (lat1, long1, lat2, long2) {
  const EARTH_RADIUS = 6371
  const latDistance = toRadians(lat2 - lat1)
  const longDistance = toRadians(long2 - long1)
  lat1 = toRadians(lat1)
  lat2 = toRadians(lat2)

  const haversine = val => Math.pow(Math.sin(val / 2), 2)

  const a = haversine(latDistance) + Math.cos(lat1) * Math.cos(lat2) * haversine(longDistance)
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS * c
}

function filterByLocation (events, { latitude: originLat, longitude: originLong }, radius) {
  return events.filter(event => {
    const [eventLat, eventLong] = event.geometry[0]?.coordinates
    const distanceBetween = getDistanceBetweenPoints(
      originLat,
      originLong,
      eventLat,
      eventLong
    )
    return distanceBetween <= radius
  })
}

async function getFires (lat, long, radius) {
  try {
    const response = await axios.get('https://eonet.sci.gsfc.nasa.gov/api/v3/events')
    const allEvents = response.data?.events
    const wildfireEvents = filterByCategory(allEvents)
    const localEvents = filterByLocation(wildfireEvents, { latitude: lat, longitude: long }, radius)
    return localEvents
  } catch (error) {
    console.log(error)
  }
}

exports.getFires = getFires

// async function main () {
//   console.log(await getFires(19.375688, -99.113600)) //home
// }

// main()
