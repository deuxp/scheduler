import React from 'react';
// import { useEffect } from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import { useVisualMode } from 'hooks/useVisualMode';

function Appointment({ time, interview, interviewers, bookInterview, id }) {
  const EMPTY = 'EMPTY',
        SHOW = 'SHOW',
        CREATE = 'CREATE',
        SAVING = 'SAVING',
        { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)
  

  // Saving an appointment
  function save(name, interviewer) {
    const interview = { 
      student: name,
      interviewer
    }
    transition(SAVING)
    bookInterview(id, interview, () => transition(SHOW))
  };

  const renderStatus = <Status 
      message={SAVING}
    />

  const renderShow = <Show 
    interviewer={interview && interview.interviewer} 
    student={interview && interview.student}
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
    />

  return (
    <div className='appointment'>
      <Header time={time} />
      {mode === EMPTY && renderEmpty}
      {mode === SHOW && renderShow}
      {mode === CREATE && renderForm}
      {mode === SAVING && renderStatus}
    </div>
  )
}

export default Appointment