import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointements = getAppointmentsForDay(state, state.day);
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
  

  // Book the appointments - should change the state and axios POST to update the database
  function bookInterview(id, interview) {
    console.log(interview.interviewer)
    const appointment = {
      // new interview data replaces null default 
      ...state.appointments[id],
      interview: { ...interview }
    };
    // updated clone of appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    console.log('the following is the appointments')
    console.log(appointment)
    // update the state locally, the interviewer data will be attached to the ID and passed down to the Show via the selector operation
    setState({
      ...state,
      appointments
    })
  };

 



  // shape appointment data -> appointment: { id, time, interview }
  const schedules = dailyAppointements.map(appointment => {
      // map appointment.interview.interviewer: n to obj
      const interview = getInterview(state, appointment.interview)
      const interviewers = getInterviewersForDay(state, state.day)
      
      return <Appointment key={appointment.id}
                          id={appointment.id}                    
                          time={appointment.time}
                          interview={interview}
                          interviewers={interviewers}
                          bookInterview={bookInterview}

      />
  })
  // CSS pseudoclass -> appointment__add:last-type: {display: none;}
  schedules.push(<Appointment key='last' time='5pm' />)
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {schedules}
      </section>
    </main>
  );
}
