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

  
  /**
   * Purpose: to update the number of avialable appoinments for a day
   * @param {Object} state The state Object
   * @returns a new Array of day objects, with the spots property updated to current avaialbility
   */      
  function spots(state) {
    return state.days.map(day => {
      if (day.name === state.day) {
      return {
        ...day,
        spots: day.appointments.reduce((accumulator, id) => {
                if (!state.appointments[id].interview){
                  return accumulator += 1
                } else {
                  return accumulator += 0
                }
              }, 0)
            }
          } else {
            return day;
      }
    })
  };

  
  /**
   * Purpose: (a) delete the interview 
   *          (b) update the API with axios 
   *          (c) update the state locally
   * @param {Number} id of appointment object
   * @returns undefined
   * Behaviour: Promise based but only used for side-effects: setState & axios PUT request
   *            also calls the spots() func to update the available spots for that day
   */
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    // axios update to the db
    return new Promise((resolve, reject) => {
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(res => {
        if (res.status !== 204) {
          throw new Error()
        }
        console.log('API successfully deleted appointment')        
        return {...state, appointments}
      }).then(state => {
        // update available spots for the day
        return {
          ...state,
          days: spots(state)
        }
      })
      .then(state => {
        setState(state)
        resolve()
      })
      .catch(err => {
        console.log(err.message)
        reject(err)
      })
    })
  }
    

  /**
   * Purpose: Book the appointments -> change the state and axios POST to update the database
   * @param {Number} id the id of the appiontment obj
   * @param {Object} interview new interview Object to replace null for the appointment obj
   * @param {String} edit passed in at the <Form/> level.. If student name exists
   *                      then the form is in Edit mode and will inform spots() 
   *                      to not update. It is the same criteria that he <Form/> uses
   *                      for the Edit mode.
   * @returns undefined 
   * Behaviour: Promise-based, but no value is passed, only side-effects: setState & axios PUT request
   *            also calls the spots() func to update the available spots for that day
   */
  function bookInterview(id, interview) {
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
    return new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(res => {
        if (res.status !== 204) {
          throw new Error()
        }
        console.log('API updated successfully')
        return {...state, appointments}
      })
      .then(state => {
        // spots are updated unless the form is being edited
        return {
          ...state,
          days: spots(state)
        }
      })
      .then(updateState => {
        // this is where we update the state wholly and once
        setState(updateState)
        resolve()
      })
      .catch(err => {
        console.log('Error in bookInterview(): ', err.message)
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