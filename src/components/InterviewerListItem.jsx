import React from 'react'
import 'components/InterviewerListItem.scss'
import classNames from 'classnames';

/**Props
 * - [X] name - for display
 * - [X] avatar
 * - [X] onClick handler() - setInterviewer()
 * - [X] selected - true if onclick changes the state:interviewer === name
 * - [X] id - args for the setInterviewer(id) - state change
 *  - [X] refactor the func() passdown so that id is called in the parent Component so you dont have to pass down props.id.. results in 2 lines of code ofver the two instead of 3.. Do as an inline callback as the propName expression, with the event handdler param, since it will be entered by default on the event.. or not
 *        Now the onclick can just be called as a naked function reference.. less waste and a common react pattern
 * - [X] import css and enter the proper classnames in classNames()
 */

function InterviewerListItem({name, avatar, selected, setInterviewer}) {

  const interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': selected}) // find the classnames for this element and their respective modifier
  
  
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}

export default InterviewerListItem