import React from 'react'
import 'components/DayListItem.scss'
import classNames from 'classnames';

/**
 * takes in 4 props:
 * 
    - [X] name:String the   -> name of the day
    - [ ] spots:Number      -> the number of spots remaining - used twice: a full day is indicated by 0 slots
    - [ ] selected:Boolean  -> true or false declaring that this day is selected
    - [X] setDay:Function   -> accepts the name of the day eg. "Monday", "Tuesday"
    - [ ] dayClass conditional class appending

    Problem: uses the selected prop to determine which styles to apply
 */

    export default function DayListItem({name, spots, setDay, selected}) {
      const handleClick = (day) => setDay(day);
      const dayClass = classNames('day-list__item', {
        'day-list__item--selected': selected,
        'day-list__item--full': spots === 0
      })
      
      
      return (
        <li className={dayClass} onClick={() => handleClick(name)}>
          <h2 className="text--regular">{name}</h2> 
          <h3 className="text--light">{spots} spots remaining</h3>
        </li>
      );
    }