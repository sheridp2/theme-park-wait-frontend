import React from 'react'

const TripList = ({ trips }) => {
  return (
    <div>
      {trips.map(trip => (
        <div key={trip._id}>
          <h3>{trip.tripName}</h3>
          <p>{trip.park}</p>
          <p>{trip.startDate} - {trip.endDate}</p>
        </div>
      ))}
    </div>
  )
}

export default TripList
