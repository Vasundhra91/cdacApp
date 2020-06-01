import React, { useReducer, useEffect} from 'react';
import {userReducer} from './userReducer'
export const userContext = React.createContext();

export function UserContextProvider(props)
{
  const [user, dispatch] = useReducer(userReducer,[] , ()=>{
     const localdata= localStorage.getItem('user');
     return localdata ? JSON.parse(localdata):[]
  }
  );

  useEffect(() => {
    localStorage.setItem('user',JSON.stringify(user))
    
  }, [user])

    return(
        <userContext.Provider value={{user,dispatch}}>
           {props.children}
        </userContext.Provider>
    )
}




