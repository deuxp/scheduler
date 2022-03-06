import React from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Form from './Form';
import { useVisualMode } from 'hooks/useVisualMode';

export default function Appointment({ time, interview, _id }) {

  const EMPTY = 'EMPTY',
        SHOW = 'SHOW',
        CREATE = 'CREATE',
        { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)
  
  const renderShow = <Show 
    interview={interview} 
    className='appointment__add' />

  const renderEmpty = <Empty 
    className='appointment__add' 
    onAdd={() => transition(CREATE)} />

  const renderForm = <Form 
    interviewers={[]}
    onSave={() => console.log('onSave')}
    onCancel={() => back()} />
  
  return (
    <div className='appointment'>
      <Header time={time} />
      {mode === EMPTY && renderEmpty}
      {mode === SHOW && renderShow}
      {mode === CREATE && renderForm}
    </div>
  )
}
