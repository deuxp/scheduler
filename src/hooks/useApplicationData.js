import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
    
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day})
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
    .then(payload => {
      const [days, appointments, interviewers] = payload;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }))
    }) 
  }, [])
  


  // function to (a) delete the interview (b) update the API with axios (c) pass this down to Application.index.jsx
  function deleteInterview(id) {
    return new Promise((resolve, reject) => {

      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      // axios update to the db
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        if (response.status === 204) {
          setState(prev => ({
            ...prev,
            appointments
          }))
        }
      })
      .then(() => {
        console.log('API successfully deleted appointment')        
        resolve()
      })
      .catch(err => {
        console.log(err.message)
        reject(err)
      })
    })
  }
    
    
    // Book the appointments - should change the state and axios POST to update the database
  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      const appointment = {
        // new interview data replaces null default - used to update local state and API
        ...state.appointments[id],
        interview: { ...interview }
      };
      // updated clone of appointments - used to update local state
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      // update the API database, the interviewer data will be attached to the ID and passed down to the Show via the selector operation
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(response => {
        if (response.status === 204) {
          setState(prev => ({
            ...prev,
            appointments
          }))
        }
      })
      .then(() => {
        console.log('API updated successfully')
        resolve()
      })
      .catch(err => {
        console.log(err.message)
        reject(err)
      })
    })
  };
    


  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}