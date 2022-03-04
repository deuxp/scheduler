import { React, useState } from 'react'

export function useVisualMode(initState) {
  const [mode, setMode] = useState(initState)
  const [history, setHistory] = useState([initState])   // stack data structure (LIFO)
  // all logic inside
  const back = () => { 
    if (history.length>1) {
      setMode(history[history.length - 2])              // roll back
      history.splice(history[history.length - 1], 1)    // pop the top
    } 
  }
  const transition = (newmode) => { 
      setHistory([...history, newmode])
      setMode(newmode)
      
  }
  
  return {
    mode,
    transition,
    back
  }
}


/** Notes --- --- -- -- - --- - - - --  -- - - -
 * -> an advantage to monitoring state in a hook is that 
 *    the return is curernt information, much like "prev".
 * 
 * -> Custom hooks are like functional programming paradigm.
 * 
 * -> you are essentially extracting the shared logic of similarly used hooks.
 */