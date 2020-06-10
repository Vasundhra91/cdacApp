export const courseReducer=(state, action)=>{
    switch(action.type)
    {
        case 'login':
            return[...state,action.course]
        case 'logout':
             return[]
             default: return[...state,action.course]
    }
}