import React from 'react'
import './styles.scss'
// import Header from './Header'
// import Empty from './Empty'

export default function Appointment({time}) {
  const slot = (time && `Appointment at ${time}`) || 'No Appointments'
  return (
    <div>

      <article className="appointment">{slot}</article>
    </div>
  )
}
