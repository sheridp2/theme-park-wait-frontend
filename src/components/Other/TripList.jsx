import React from 'react'
import TripCard from '../Cards/TripCard'

const TripList = ({ trips, onDelete }) => {
  return (
    <>
      {trips.map(trip => (
      <TripCard key={trip._id} trip={trip} onDelete={() => onDelete(trip._id, trip.tripName)} />
      ))}
    </>
  )
}

export default TripList
