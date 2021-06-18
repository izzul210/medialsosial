import { SET_USER,
         SET_ERRORS, 
         CLEAR_ERRORS, 
         LOADING_UI, 
         SET_UNAUTHENTICATED, 
         LOADING_USER,
         MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';

//User's Log In
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
    .post('/login', userData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData()); 
        dispatch({ type: CLEAR_ERRORS});
        history.push('/');
    })
    .catch(err=> {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
        });
    }

//Sign Up User
export const signupUser = (newUserData, history) => (dispatch) => {
        dispatch({ type: LOADING_UI });
        axios
        .post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData()); 
            dispatch({ type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(err=> {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
            });
        }

//User's logging out
export const logoutUser = () => (dispatch) => {
     localStorage.removeItem('FBIdToken');
     delete axios.defaults.headers.common['Authorization'];
     dispatch({ type: SET_UNAUTHENTICATED});
 }

//Get data of User that logs in
export const getUserData = () => (dispatch) => {
        dispatch({ type: LOADING_USER});
        //getting the user data
        axios.get('/user')
             .then(res => {
                 dispatch({
                     type: SET_USER,
                     payload: res.data //payload contains the data of user
                 })
             })
             .catch(err => console.log(err));
 }

//Upload Image for Profile Picture
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
         .then(() => {
             dispatch(getUserData());
         })
         .catch(err => console.log(err));
}

//Edit user details 
export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
         .then(() => {
             dispatch(getUserData());
         })
         .catch(err => console.log(err));
}


//Mark Read for Notifications
export const markNotificationsRead = (notificationIds)  => dispatch => {
    axios.post('/notifications', notificationIds)
         .then(() => {
             dispatch({
                 type:MARK_NOTIFICATIONS_READ
             })
         })
         .catch(err => console.log(err));
}

//For Authorization
 const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
 }

