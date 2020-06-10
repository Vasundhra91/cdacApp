import React, { useReducer, useEffect } from 'react';
import { userReducer } from './userReducer'
import { courseReducer } from './courseReducer'
export const userContext = React.createContext();
export const courseContext = React.createContext();

export function UserContextProvider(props) {
  const [user, dispatch] = useReducer(userReducer, [], () => {
    const localdata = localStorage.getItem('user');
    return localdata ? JSON.parse(localdata) : []
  }
  );
  const [course, dispatchcourse] = useReducer(courseReducer, [], () => {
    const localdata = localStorage.getItem('course');
    return localdata ? JSON.parse(localdata) : []
  }
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))

  }, [user])

  useEffect(() => {
    localStorage.setItem('course', JSON.stringify(course))
  }, [course])

  return (
    <userContext.Provider value={{ user, dispatch }}>
      <courseContext.Provider value={{ course, dispatchcourse }}>
        {props.children}
      </courseContext.Provider>
    </userContext.Provider>
  )
}