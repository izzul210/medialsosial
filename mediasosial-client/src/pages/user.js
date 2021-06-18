import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import Loading from './loading';
import './home.css';

//Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataAction';

class user extends Component {
    state = {
        profile: null,
        postIdParam: null
    };

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const postId = this.props.match.params.postId;

        if(postId) this.setState({ postIdParam: postId });

        this.props.getUserData(handle);
        axios
             .get(`/user/${handle}`)
             .then(res => {
                this.setState({
                    profile: res.data.user
                });
             })
             .catch(err=> console.log(err));
    }

    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;
        const {authenticated} = this.props;

        const postsMarkup = loading ? (
            <Loading/>
        ) : posts === null ? (
            <p>Nope. No posts</p>
        ) : !postIdParam ? (
            posts.map(post => <Post key={post.postId} post={post}/>)
        ) : (
            posts.map(post => {
                if(post.postId !== postIdParam)
                    return <Post key={post.postId} post={post}/>
                else return  <Post key={post.postId} post={post} openDialog/>
            })
        )

        return (
            <div className={authenticated ? "userPresent" : " " } >
              <Grid container spacing ={4}>
                <Grid item sm={8} xs={12}>
                   {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <Loading/>
                    ) : (
                    <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
              </Grid>
            </div>
            
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired 
    
};

const mapStateToProps = (state) => ({
    data: state.data,
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {getUserData})(user);
