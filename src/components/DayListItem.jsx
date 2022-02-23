import React from 'react'
import 'components/DayListItem.scss'
import classNames from 'classnames';

/**
 * takes in 4 props:
 * 
    - [X] name:String the   -> name of the day
    - [X] spots:Number      -> the number of spots remaining - used twice: a full day is indicated by 0 slots
    - [X] selected:Boolean  -> true or false declaring that this day is selected
    - [X] setDay:Function   -> accepts the name of the day eg. "Monday", "Tuesday"
    - [X] dayClass conditional class appending

    Problem: uses the selected prop to determine which styles to apply
 */

    export default function DayListItem({name, spots, setDay, selected}) {

      const dayClass = classNames('day-list__item', {
        'day-list__item--selected': selected,
        'day-list__item--full': spots === 0
      })

      // called in the Component render with formatSpots() since it is just something that renders without being in the async event loop
      const formatSpots = () => {
        return  (!spots && 'no spots remaining') ||
                (spots === 1 && '1 spot remaining') ||
                (spots && `${spots} spots remaining`)
      }
      
      return (
        <li className={dayClass} onClick={() => setDay(name)}>
          <h2 className="text--regular">{name}</h2> 
          <h3 className="text--light">{formatSpots()}</h3>
        </li>
      );
    }