import React from 'react'
import InterviewerListItem from './InterviewerListItem'
import './InterviewerList.scss'

/** 
 * - Interviewers:Array of Numbers representing the interviewers id's
 * - selected:Boolean - name === interviewer determines if interviewer selected
 */

function InterviewerList({interviewers, value, onChange}) {

  const renderInterviewerList = interviewers.map(mentor => {
    const { id, name, avatar } = mentor

    return <InterviewerListItem 
      key={id} 
      name={name}
      avatar={avatar}
      selected={id === value}
      setInterviewer={() => onChange(id)}
      />
  })
  
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{renderInterviewerList}</ul>
    </section>
  )
}

export default InterviewerList