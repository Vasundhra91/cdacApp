

export const userReducer=(state, action)=>{
    switch(action.type)
    {
        case 'login':
            return[...state,action.user]
        case 'logout':
             return[]
             default: return[...state,action.user]
    }
}