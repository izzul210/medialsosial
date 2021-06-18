import { SET_POSTS, 
         SET_POST,
         LOADING_DATA,
         LIKE_POST, 
         UNLIKE_POST, 
         DELETE_POST,
         POST_POST, 
         SUBMIT_COMMENT,
         SET_COMMENT,
         TRANS_COMMENT,
         DELETE_COMMENTS,
        } from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false,
    comments:[],
    commentLoad: false,
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true,
                commentLoad:true,
            }
        case SET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false
            }
        case SET_POST:
             return{
                ...state,
                post: action.payload, 
                loading: false
                }
        case SET_COMMENT: 
             let index2 = state.comments.findIndex((comment)=> comment[0].postId === action.payload[0].postId);
             if(index2 === -1){
                return{
                    ...state,
                   comments: [action.payload, ...state.comments],
                   loading: false
                }
             } else {
                 return {
                    ...state,
                    loading: false
                 }
             };
             
        case LIKE_POST:
        case UNLIKE_POST:
            var index = state.posts.findIndex((post)=> post.postId === action.payload.postId);
            state.posts[index] = action.payload;
            if(state.post.postId === action.payload.postId){
                state.post = action.payload;
            }
            return {
                ...state
            };

        case TRANS_COMMENT:
            return{
                ...state,
                comments: action.payload,
                commentLoad: false,
            }

        case DELETE_POST:
            index = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(index, 1);
            return{
                ...state
            };

        case DELETE_COMMENTS: 
            for(var index5 = state.comments.length - 1; index5 >=0; index5--){
                  if(state.comments[index5].postId === action.payload){
                      state.comments.splice(index5, 1);
                  }
            };
            return{
                ...state
            };

        case POST_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            };
        case SUBMIT_COMMENT:
            return{
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments]
                },
                comments: [action.payload,...state.comments]
            }

        default:
            return state
    }
}