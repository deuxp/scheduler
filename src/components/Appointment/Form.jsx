import React, { useState } from 'react'
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'

function Form({onSave, onCancel, interviewers}) {

  const [student, setStudent] = useState('')
  const [interviewer, setInterviewer] = useState(null) // null since expecting Number

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
      <Button confirm onClick={() => onSave(student, interviewer)}>Save</Button> 

      
    </section>
  </section>
</main>

  )
}

export default Form

