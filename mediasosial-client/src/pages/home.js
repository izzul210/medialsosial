import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import './home.css';

import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import Loading from './loading';
import PostPost from '../components/post/PostPost';

import {connect} from 'react-redux';
import {getPosts, transComment} from '../redux/actions/dataAction';

export class home extends Component {
    componentDidMount(){
        this.props.getPosts();
        this.props.transComment();
    }

    render() {
        const { posts, loading } = this.props.data;
        const {authenticated} = this.props;
        let recentPostsMarkup = !loading ? (
        posts.map((post) => <Post key={post.postId} post={post}/>)
        ) : (
            <Loading />   
        );

        return (    
            <div className={authenticated ? "userPresent" : " " } >
              <Grid container spacing ={4} >
                <Grid item sm={8} xs={12} className="post_background">
                    <PostPost />
                   {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
             </Grid> 
            </div>   
                          
        );
    }
}

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    transComment: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired 
}

const mapStateToProps = state => ({
    data: state.data,
    authenticated: state.user.authenticated,
})

const mapActionsToProps = {
    getPosts,
    transComment,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
