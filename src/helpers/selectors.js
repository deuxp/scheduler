
/**
 * @param {Object} state 
 * @param {String} day filter by day
 * @returns new Array of appointment objects for a specified day
 */
export function getAppointmentsForDay(state, day) {
  let result = [];
  state.days.forEach(jour => {
    if (jour.name === day) {
      result = result.concat(jour.appointments)
        .map(id => state.appointments[id])
    }
  });
  return result;
};

/**
 * Purpose: Complete the interview Object by replacing the interviewer's id 
 *          with their respective Object
 * @param {Object} state 
 * @param {Object} interview {student:String, interviewer:Number}
 * @returns a new interview Object with the interviewer property updated info or 
 *          null if there is no interview
 * Behaviour: interview.interviewer is a Number which corresponds to the id of the interviewer 
 *            in the state.interviewers Object
 */
export function getInterview (state, interview) {
  if ( interview ) {
    const interviewer = state.interviewers[interview.interviewer]
    return {...interview, interviewer}
  }
  return null;
}

/**
 * @param {Object} state 
 * @param {String} day String of the day
 * @returns new Array of interview Objects for a specified day
 */
export function getInterviewersForDay (state, day) {
  let result =[];
  if (state.days.length > 0) {
    state.days.forEach(d => {
      if (d.name === day) {
        result = result.concat(d.interviewers)
          .map(id => state.interviewers[id])
      }
    })
  }
  return result;
};
