import { useState } from 'react'

export function useVisualMode(initState) {
  const [mode, setMode] = useState(initState)
  const [history, setHistory] = useState([initState]) // stack data structure (LIFO)
  // all logic inside the setter
  const back = () => { 
    setHistory(prev => {
      if (prev.length>1) {
        prev.splice(prev.length - 1, 1) // pop the top
        setMode(prev[prev.length - 1]) // roll back
      } 
      return ([...prev]) // need to set to the current state
    })
  }

  // replace=true after setting mode to 'Error handlers'
  const transition = (newmode, replace = false) => { 
    // must use prev since mode is reliant on current state
    setHistory(prev => {
      if (replace) {
        prev.splice(prev.length -1, 1)
      }
      return ([...prev, newmode])
    }) 
      setMode(newmode)
  }
  
  return {
    mode,
    transition,
    back,
    history
  }
}


/** Notes --- --- -- -- - --- - - - --  -- - - ---- - - - --  -- - - -
 * -> an advantage to monitoring state in a hook is that 
 *    the return is curernt information, much like "prev".
 * 
 * -> Custom hooks are like functional programming paradigm.
 * 
 * -> you are essentially extracting the shared logic of similarly used hooks.
 * 
 * -> conditional setting needs for the logic to be housed wihtin the seetState
 *  -> when multiline conditions inthe setState, remember to return, since it is not implicit anymore
 *    -> also remember to be working with the most recent state using prev.. But use it TOTALLY, not just kind-of.. I'm using it everywhere right now!!
 *      -> once you start using prev, you shouldn't be refering to the state directly anymore, it's prev that you should be refering to and operating on
 * 
 * -> setStates can happen iside of another setState.. Especially if it makes sense to do so. There is no rule against that!
 */