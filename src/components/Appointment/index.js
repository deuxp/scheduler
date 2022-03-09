import React from 'react';
import { useState } from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import { useVisualMode } from 'hooks/useVisualMode';

function Appointment({ time, interview, interviewers, bookInterview, deleteInterview, id }) {
  const EMPTY = 'EMPTY',
        SHOW = 'SHOW',
        CREATE = 'CREATE',
        SAVING = 'SAVING',
        CONFIRM = 'CONFIRM',
        EDIT = 'EDIT',
        { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY),
        [statusMessage, setStatusMessage] = useState('')
        
  
  // Saving an appointment -- = -= -- -- -  -- --- -- -=  -== - = -
  function save(name, interviewer) {
    const interview = { 
      student: name,
      interviewer
    }
    setStatusMessage('Saving')

    transition(SAVING, true)
    bookInterview(id, interview)
      .then(() => transition(SHOW))
  };
  
  // Deleting an appointment -- = -= -- -- -  -- --- -- -=  -== - = -
  function erase() {
    setStatusMessage('Deleting')
    transition(SAVING, true)
    // call the function in application
    deleteInterview(id)
      .then(() => transition(EMPTY))
  }
        
  const renderConfirm = <Confirm 
      message={'Are You sure you want to Delete the Appointment?'}
      onCancel={() => back()}
      onConfirm={() => erase()}
    />
  
  const renderStatus = <Status 
      message={statusMessage}
    />

  const renderShow = <Show 
    interviewer={interview && interview.interviewer} 
    student={interview && interview.student}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
    className='appointment__add' 
    />

  const renderEmpty = <Empty 
    className='appointment__add' 
    onAdd={() => transition(CREATE)} 
    />

  const renderForm = <Form 
    interviewers={interviewers}
    onSave={save}
    onCancel={() => back()} 
    studentName={interview && interview.student}
    interviewerID={interview && interview.interviewer.id}
    />

  return (
    <div className='appointment'>
      <Header time={time} />
      {mode === EMPTY && renderEmpty}
      {mode === SHOW && renderShow}
      {mode === CREATE && renderForm}
      {mode === SAVING && renderStatus}
      {mode === CONFIRM && renderConfirm}
      {mode === EDIT && renderForm}
    </div>
  )
}

export default Appointment