import axios from "axios";

export function loginUser(email, password) {
    return function(dispatch) {
        axios.get(`http://localhost:3000/login/${email}/${password}`)
            .then((response) => {
                dispatch ({type: "LOGIN_USER_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch ({type: "LOGIN_USER_REJECTED", payload: err})
            })
    }
}

export function fetchUser(userId) {
    return function(dispatch) {
        axios.get(`http://localhost:3000/api/users/${userId}`)
            .then((response) => {
                dispatch ({type: "FETCH_USER_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch ({type: "FETCH_USER_REJECTED", payload: err})
            })
    }
}

export function fetchUsers() {
    return function(dispatch) {
        axios.get("http://localhost:3000/api/users/")
            .then((response) => {
                dispatch ({type: "FETCH_USERS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch ({type: "FETCH_USERS_REJECTED", payload: err})
            })
    }
}

// export function setUserName(name) {
//     return {
//         type: "SET_USER_NAME",
//         payload: name,
//     }
// }

// export function setUserAge(age) {
//     return {
//         type: "SET_USER_AGE",
//         payload: age,
//     }
// }