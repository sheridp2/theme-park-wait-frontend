import React from 'react'
import { DISNEY_WORLD_PARKS_LIST, DISNEYLAND_PARKS_LIST } from '../../util/data'
import ParkCard from '../Cards/ParkCard'


const ParksList = () => {
  return (
    <div>
      <div className="py-6">
        <h2>Parks List</h2>
      </div>
      <div>
        <div>
          <h3 className='text-xl font-semibold mb-4'>Disney World</h3>
        </div>
        <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-4'>

        {DISNEY_WORLD_PARKS_LIST.map((park) => {
          return(
            <ParkCard key={park.id} park={park} />
          )
        })}
        </div>
      </div>

      <div>
        <div>
          <h3 className='text-xl font-semibold mb-4 mt-8'>Disneyland</h3>
        </div>
        <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-4'>

        {DISNEYLAND_PARKS_LIST.map((park) => {
          return(
            <ParkCard key={park.id} park={park} />
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default ParksList
