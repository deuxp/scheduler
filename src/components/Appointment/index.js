import React from 'react'
import Empty from './Empty'
import './styles.scss'
import Header from './Header'
import Show from './Show'

// props: (1) time (2) interview:truthy->render<Show/> || <empty/> 

export default function Appointment({ time, interview, student }) {
  const renderInterview =
    <Show 
      interview={interview} 
      className='appointment__add' 
    />
  const renderEmpty = <Empty className='appointment__add' />
  
  return (
    <div className='appointment'>
      <Header time={time} />
      {interview ? renderInterview : renderEmpty}
    </div>
  )
}
