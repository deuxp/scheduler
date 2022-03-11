import React, { useState } from 'react'
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'

function Form({onSave, onCancel, interviewers, studentName, interviewerID}) {
  const [student, setStudent] = useState(studentName || '')
  const [interviewer, setInterviewer] = useState(interviewerID || null)
  const [errorMessage, setErrorMessage] = useState('')

  const reset = () => {
    setStudent('')
    setInterviewer(null)
  }
  const cancel = () => {
    reset()
    onCancel()
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
              onSubmit={event => event.preventDefault()} 
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={e => setStudent(e.target.value)}
          />
          <p>{errorMessage}</p>
        </form>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {
            if ( student.length === 0 ) setErrorMessage('*Required: Student name cannot be empty')
            else if ( !interviewer ) setErrorMessage('*Required: Must select a mentor')
            else onSave(student, interviewer)
            }}>Save</Button> 

          
        </section>
      </section>
  </main>

  )
}

export default Form

