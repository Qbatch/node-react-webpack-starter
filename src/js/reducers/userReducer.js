const userData = {
    id: null,
    name: null,
    age: null,
    username: null,
    password: null,
    email: null,
}

export default function reducer(state={
    users: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch(action.type) {
        case "LOGIN_USER": {
            return {
                ...state, 
                fetching: true,
            }
        }
        case "LOGIN_USER_REJECTED": {
            return {
                ...state, 
                fetching: false, 
                error: action.payload,
            }
        }
        case "LOGIN_USER_FULFILLED": {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                users: action.payload,
            }
        }
        case "FETCH_USERS": {
            return {
                ...state, 
                fetching: true,
            }
        }
        case "FETCH_USERS_REJECTED": {
            return {
                ...state, 
                fetching: false, 
                error: action.payload,
            }
        }
        case "FETCH_USERS_FULFILLED": {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                users: action.payload,
            }
        }
        case "FETCH_USER": {
            return {
                ...state, 
                fetching: true,
            }
        }
        case "FETCH_USER_REJECTED": {
            return {
                ...state, 
                fetching: false, 
                error: action.payload,
            }
        }
        case "FETCH_USER_FULFILLED": {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                users: action.payload,
            }
        }
        // case "SET_USER_NAME": {
        //     return {
        //         ...state, 
        //         user: {...state.user, name: action.payload},
        //     }
        // }
        // case "SET_USER_AGE": {
        //     return {
        //         ...state, 
        //         user: {...state.user, age: action.payload},
        //     }
        // }
    }

    return state
}