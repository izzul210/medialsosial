import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostPost from '../post/PostPost';
import Notifications from './Notifications';
import './Navbar.scss';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

const styles = {
    card: {
        textAlign: 'center',
        background: 'none',
        margin: 'auto auto',
        maxWidth: '520px',
        marginBottom: '20px',
        borderRadius: '25px',
        boxShadow: 'inset -5px -5px 2px rgba(255,255,255,0.5), inset 5px 5px 10px rgba(70,70,70,0.12)',
  },
  navBartheme:{
    maxWidth: '100%',
    position: 'fixed',
    backgroundColor: 'none',
    boxShadow: '5px 5px 10px rgba(70,70,70,0.12),-5px -5px 5px rgba(255,255,255,0.5)',
    borderRadius: '0px',
  }
}

class Navbar extends Component {
    render() {
        const { classes, authenticated } = this.props
        return (
            <AppBar className={classes.navBartheme}>
                 <div className="appBar" >
                        {authenticated ? (
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={8}>
                                        <PostPost />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                     <div className='navButtons'>
                                        <button title='DO NOT CLICK!' className='uselessButton'>
                                              <i class="fa fa-bomb" aria-hidden="true"></i>
                                        </button>
                                        <Link to="/">
                                          <button className='homeButton' title='Home'>
                                             <i class="fa fa-home" aria-hidden="true"></i>
                                          </button>
                                        </Link>     
                                         <Notifications />
                                     </div>
                                 </Grid> 
                            </Grid>
                      
                            
                                
                        ) : (          
                        <div className='noUserNav'>
                                <Link to="/login">
                                <button className='loginButton' title='Login'>
                                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                                </button>
                                </Link>     
                              <Link to="/">
                                  <button className='homeButton' title='Home'>
                                     <i class="fa fa-home" aria-hidden="true"></i>
                                 </button>
                                </Link> 
                              <Link to="/signup">
                                <button className='signupButton' title='Sign up'>
                                    <i class="fa fa-user-plus" aria-hidden="true"></i>
                                 </button>
                                </Link>     
                        </div> 
                        )}
                    
                </div>
                </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired 
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
