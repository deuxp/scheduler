import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData()

  const dailyAppointements = getAppointmentsForDay(state, state.day);
  // shape appointment data -> appointment: { id, time, interview }
  const schedules = dailyAppointements.map(appointment => {
      // map appointment.interview.interviewer[id] = {...}
      
      return <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={() => getInterview(state, appointment.interview)}
        interviewers={() => getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
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
