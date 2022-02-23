import React from 'react'
import DayListItem from './DayListItem'
import classNames from 'classnames'

/**
 * The DayList component will take in three props:

    - [ ] days:Array      -> a list of day objects (each object includes an id, name, and spots)
    - [ ] day:String      -> the currently selected day
    - [ ] setDay:Function -> accepts the name of the day eg. "Monday", "Tuesday"

The DayList is responsible for rendering a list of DayListItem components. 
It doesn't have any styles of its own so we don't need a DayList.scss file. 
 */

export default function DayList({days, day, setDay}) {

  const dings = days.map(dayo => {
    const { id, name, spots } = dayo;
    return <DayListItem 
    
      key={id} 
      name={name} 
      spots={spots} 
      selected={name === day} 
      setDay={setDay} 

      />
  })
  
  return (
    <ul>
      <li>
        {dings}
      </li>
    </ul>
  )
}
