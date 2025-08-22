import React from 'react'
import { PARKS_LIST } from '../util/data'
import ParkCard from './ParkCard'

const ParksList = () => {
  return (
    <div>
      <div className="py-6">
        <h2>Parks List</h2>

      </div>
      <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-4'>

      {PARKS_LIST.map((park) => {
        return(
          <ParkCard key={park.id} park={park} />
        )
      })}
      </div>
    </div>
  )
}

export default ParksList
