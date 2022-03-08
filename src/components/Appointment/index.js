import React from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import { useVisualMode } from 'hooks/useVisualMode';

function Appointment({ time, interview, interviewers, bookInterview, id }) {
  const EMPTY = 'EMPTY',
        SHOW = 'SHOW',
        CREATE = 'CREATE',
        { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)
  
  // Saving an appointment
  function save(name, interviewer) {
    const interview = { 
      student: name,
      interviewer
    }
    // updates state locally
    bookInterview(id, interview);
    transition(SHOW)
  };
  const renderShow = <Show 
    interview={interview} 
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
    </div>
  )
}

export default Appointment