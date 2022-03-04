
/**
 * @param {{days:[{}], appointments:{a:{}}}} state 
 * @param {''} day filter by day
 * @returns Array of the appointments for a specified day
 */
export function getAppointmentsForDay(state, day) {
  let result = [];
  state.days.forEach(jour => {
    if (jour.name === day) {
      result = result
        .concat(jour.appointments)
          .map(appointment => state.appointments[appointment])
    }
  });
  return result;
};

export function getInterview (state, interview) {
  if ( interview ) {
    const interviewer = state.interviewers[interview.interviewer]
    return {...interview, interviewer}
  }
  return null
}