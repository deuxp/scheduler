import React from 'react'
import DayListItem from './DayListItem'


export default function DayList({days, value, onChange}) {

  // array of the component
  const renderDayListItem = days.map(day => {
    const { id, name, spots } = day;

    return <DayListItem 
      key={id} 
      name={name} 
      spots={spots} 
      selected={name === value} 
      setDay={() => onChange(name)} 
      />
  })
  
  return (
    <ul>
      {renderDayListItem}
    </ul>
  )
}
