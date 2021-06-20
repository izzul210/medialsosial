import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostButton from '../post/PostButton';
import Notifications from './Notifications';
import ProfileIcon from '../profile/ProfileIcon';
import './Navbar.scss';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar className="navbar_theme">
                 <div className="appBar" >
                        {authenticated ? (
                            <Grid container spacing={1} className="navbar_template">
                                <Grid className="navbar_logo">
                                    <Link to="/">
                                        <h2>MediaSosial</h2>
                                    </Link> 
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                     <div className='navbar_bar'>
                                         <div className='navButtons'>
                                            <PostButton />
                                            <Link to="/">
                                            <button className='navbar_button' title='Home'>
                                                <i class="fa fa-home" aria-hidden="true"></i>
                                            </button>
                                            </Link>     
                                            <Notifications />
                                         </div>
                                        <ProfileIcon />
                                     </div>
                                 </Grid> 
                            </Grid>
                      
                            
                                
                        ) : (          
                            <Grid container spacing={1} className="navbar_template">
                                <Grid>
                                    <Link to="/">
                                        <h2>MediaSosial</h2>
                                    </Link> 
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                     <div className='navButtons'>
                                        <Link to="/login">
                                            <button className='navbar_button' title='Login'>
                                                <i class="fa fa-sign-in" aria-hidden="true"></i>
                                            </button>
                                        </Link> 
                                        <Link to="/">
                                          <button className='navbar_button' title='Home'>
                                             <i class="fa fa-home" aria-hidden="true"></i>
                                          </button>
                                        </Link>     
                                        <Link to="/signup">
                                            <button className='navbar_button' title='Sign up'>
                                                <i class="fa fa-user-plus" aria-hidden="true"></i>
                                            </button>
                                        </Link> 
                                     </div>
                                 </Grid> 
                            </Grid>  
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

export default connect(mapStateToProps)(Navbar);
