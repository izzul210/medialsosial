//Handle actions related to our data
import { SET_POSTS, 
         LOADING_DATA, 
         LIKE_POST, 
         UNLIKE_POST,
         DELETE_POST, 
         SET_ERRORS,
         POST_POST,
         CLEAR_ERRORS,
         LOADING_UI,
         STOP_LOADING_UI, 
         SET_POST,
         SUBMIT_COMMENT,
         SET_COMMENT,
         TRANS_COMMENT,
         DELETE_COMMENTS,
         } from '../types';
import axios from 'axios';
import { ContactlessOutlined } from '@material-ui/icons';

//Get all Posts
export const getPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get('/posts')
         .then(res => {
             dispatch({
                 type: SET_POSTS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type: SET_POSTS,
                 payload: []
             })
         })
}

//Get a single Post
export const getPost = (postId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.get(`/post/${postId}`)
         .then(res => {
             dispatch({
                 type: SET_POST,
                 payload: res.data
             });
             dispatch({type: STOP_LOADING_UI})
         })
         .catch(err => console.log(err));
         
}

//NEW UPDATE COMMENT
export const transComment = () => (dispatch) => {
    axios.get(`/comments`)
         .then(res => {
             dispatch({
                 type: TRANS_COMMENT,
                 payload: res.data
             });
             dispatch({type: STOP_LOADING_UI})
         })
         .catch(err => console.log(err));
}

export const showComment = (postId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.get(`/post/${postId}`)
         .then(res => {
             dispatch({
                 type: SET_COMMENT,
                 payload: res.data.comments
             });
             dispatch({type: STOP_LOADING_UI})
         })
         .catch(err => console.log(err));
}

//Post a post
export const postPost = (newPost) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/post', newPost.body)
         .then(res => {
             dispatch({
                 type: POST_POST,
                 payload: res.data
             });
             dispatch({type: CLEAR_ERRORS});
         })
         .catch(err => {
             dispatch({
                 type: SET_ERRORS,
                 payload: err.response.data
             })
         })
}


//Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
    axios.post(`/post/${postId}/comment`, commentData)
         .then(res => {
             dispatch({
                 type: SUBMIT_COMMENT,
                 payload: res.data
             });
             dispatch(clearErrors());
            })
         .catch((error)=> {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        });
};

//Like a post
export const likePost = (postId) =>  dispatch => {
    axios.get(`/post/${postId}/like`)
         .then(res => {
              dispatch({
                  type: LIKE_POST,
                  payload: res.data
              })
         })
         .catch(err=> console.log(err));
}

//Unlike a post
export const unlikePost = (postId) =>  dispatch => {
    axios.get(`/post/${postId}/unlike`)
         .then(res => {
              dispatch({
                  type: UNLIKE_POST,
                  payload: res.data
              })
         })
         .catch(err=> console.log(err));
}

//Delete a post
export const deletePost = (postId) => (dispatch) => {
    axios.delete(`/post/${postId}`)
         .then(()=> {
             dispatch({
                 type: DELETE_POST, 
                 payload: postId 
                });
            dispatch({
                type: DELETE_COMMENTS, 
                payload: postId 
                });
         })
         .catch(err => console.log(err))
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
         .then(res => {
             dispatch({
                 type: SET_POSTS,
                 payload: res.data.posts
             });
         })
         .catch(() => {
            dispatch({
                type: SET_POSTS,
                payload: null 
            });
        });
};

//Clear all the errors
export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS})
}



