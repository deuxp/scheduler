
/**
 * 
 * @param {{days:[{}], appointments:{{}}}} state 
 * @param {''} day filter by day
 * @returns Array of the appointments for a specified day
 */
export function getAppointmentsForDay(state, day) {
  let res = []
  state.days.forEach(jour => {
    if (jour.name === day) {
      res = res
        .concat(jour.appointments)
          .map(appointment => state.appointments[appointment])
    }
  })
  return res
}