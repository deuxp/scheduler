import React from 'react';
import { useState } from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import { useVisualMode } from 'hooks/useVisualMode';

function Appointment({ time, interview, interviewers, bookInterview, deleteInterview, id }) {
  const EMPTY = 'EMPTY',
        SHOW = 'SHOW',
        CREATE = 'CREATE',
        SAVING = 'SAVING',
        DELETING = 'DELETING',
        CONFIRM = 'CONFIRM',
        EDIT = 'EDIT',
        ERROR_DELETE = 'ERROR_DELETE',
        ERROR_SAVE = 'ERROR_SAVE',
        { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY),
        [statusMessage, setStatusMessage] = useState(''),
        [errorMessage, setErrorMessage] = useState('');
        
  
  // Saving an appointment -- = -= -- -- -  -- --- -- -=  -== - = -
  function save(name, interviewer) {
    const interview = { 
      student: name,
      interviewer
    }
    setStatusMessage('Saving')

    transition(SAVING)
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        console.log('Error in save(): ', err.message)
        setErrorMessage('cannot save appointment')
        transition(ERROR_SAVE, true)
      })
  }
  
  // Deleting an appointment -- = -= -- -- -  -- --- -- -=  -== - = -
  function erase() {
    setStatusMessage('Deleting')
    transition(DELETING, true)
    // call the function in application
    deleteInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => {
        console.log('Error: ', err.message)
        setErrorMessage('cannot delete appointment')
        transition(ERROR_DELETE, true)
      })
  }

  const renderError = <Error 
      onClose={() => back()}
      message={errorMessage}
    />

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
    interviewerID={(interview && interview.interviewer.id)}
    />

  return (
    <div className='appointment'>
      <Header time={time} />
      {mode === EMPTY && renderEmpty}
      {mode === SHOW && renderShow}
      {mode === CREATE && renderForm}
      {mode === SAVING && renderStatus}
      {mode === DELETING && renderStatus}
      {mode === CONFIRM && renderConfirm}
      {mode === EDIT && renderForm}
      {mode === ERROR_SAVE && renderError}
      {mode === ERROR_DELETE && renderError}
    </div>
  )
}

export default Appointment
