import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
    
  //constants
  const SET_DAY = 'SET_DAY',
        SET_DAYS = 'SET_DAYS',
        SET_APPOINTMENTS = 'SET_APPOINTMENTS',
        SET_INTERVIEWERS = 'SET_INTERVIEWERS'

  const apiDays = 'http://localhost:8001/api/days',
        apiAppointments = 'http://localhost:8001/api/appointments',
        apiInterviewers = 'http://localhost:8001/api/interviewers'
  


  const reducer = (state, action) => {
    let newState;

    // figure out if you want house the re-assignment logic in here
    switch (action.type) {
      case 'SET_DAY':
        newState = { ...state, day: action.data };
        break;
      // change these defaults to logic .. find out what state is being passed 
      // to this reducer
      case 'SET_DAYS':
        newState = { ...state, days: action.data };
        break;
      case 'SET_APPOINTMENTS':
        newState = { ...state, appointments: action.data };
        break;
      case 'SET_INTERVIEWERS':
        newState = { ...state, interviewers: action.data };
        break;
      default:
        throw new Error(`\t${action.type} is not a valid action for Reducer!`);
    }
    return newState;
  }

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // -  [ ] refactor this to use dispatch
  const setDay = day => dispatch({type: SET_DAY, day})
  
  
  useEffect(() => {
    Promise.all([
      axios.get(apiDays),
      axios.get(apiAppointments),
      axios.get(apiInterviewers)
    ])
    .then(response => {
      // const [days, appointments, interviewers] = response;
      const actions = [SET_DAYS, SET_APPOINTMENTS, SET_INTERVIEWERS]
      response.map((payload, index) => {
        dispatch({type: actions[index], data: payload})
        return
      }) 
    })
  }, [])

  
  /**
   * Purpose: to update the number of avialable appoinments for a day
   * @param {Object} state The state Object
   * @returns a new Array of day objects, with the spots property updated to 
   *          current avaialbility
   */      
  function spots(state) {
    return state.days.map(day => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments.reduce((accumulator, id) => {
            if (!state.appointments[id].interview){
              return accumulator + 1
            } else {
              return accumulator
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
   * Behaviour: Promise based but only used for side-effects: setState & axios PUT 
   *            request also calls the spots() func to update the available spots 
   *            for that day
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
    axios.delete(`${api}/${id}`)
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
      axios.put(`${apiAppointments}/${id}`, appointment)
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