import React from 'react'
import InterviewerListItem from './InterviewerListItem'
import './InterviewerList.scss'

/** Props
 * - [X] Interviewers:Array
    * - [X] interviewer:id held in the state instead of a name: Number  STATE
    * - [X] setInterviewer:func()                                       STATE
    * - [ ] set state in common ancestor
 * - [X] selected:Boolean - evaluation name === interviewer <- state
 * - [X] set key=id
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