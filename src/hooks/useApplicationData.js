import { useState, useEffect } from "react";
import { getAppointmentsForDay } from '../helpers/selectors.js'
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
   * @param {Array} days array of all the day objects
   * @param {Number} appointmentID the appointment object
   * @param {String} sign 'add' or 'subtract': specifying the operation to update availability
   * @returns a new Array of day objects, with the spots property updated to currnt avaialbility
   */      
  function spots(state, appointmentID, sign) {
    // expect add or subtract to change the operation so this function can be reused for booking and delting interviews
    const operation = {add: 1, subtract: -1}
    let daysUpdate =[]
    state.days.forEach((day, index) => {
      if (day['appointments'].includes(Number(appointmentID))){
        const dayUpdate = {
          ...state.days[index],
          spots: getAppointmentsForDay(state, state.day)
          .reduce((accumulator, spot)=>{
          if (!spot.interview){
            return accumulator += 1
          } else {
            return accumulator += 0
          }
        }, 0)
        }
        daysUpdate = [
          ...state.days
        ]
        daysUpdate.splice(index, 1, dayUpdate)

      }
    })

    return daysUpdate;
  }

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



        const days = spots(state, id)
        return {
          ...state,
          days
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
    

  
  // Book the appointments - should change the state and axios POST to update the database
  /**
   * Purpose: 
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
  function bookInterview(id, interview, edit) {
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
        const days = spots(state, id)
        return {
          ...state,
          days
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