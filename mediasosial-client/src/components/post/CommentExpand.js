import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CommentDisplay from './CommentDisplay';
//Redux stuff
import {connect} from 'react-redux';

class CommentExpand extends Component{
    render(){
        let expandedComments = [];
        let limitedComments = [];
        
        this.props.data.comments.map((comment) => 
           ((comment.postId) === this.props.postId) ? (
             expandedComments.push(comment)
           ) : (
                null
           ) 
        );

        let i = 0;
        while(i<3){
            if(expandedComments[i] !== undefined ){
                limitedComments[i] = expandedComments[i];
            }    
            i++;
        }

        return(
            <CommentDisplay comments={limitedComments}/>
        )
   }
}

CommentExpand.propTypes = {
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    commentCount: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    post: state.data.post,
    data: state.data,
    UI: state.UI
})

export default connect(mapStateToProps)(CommentExpand);