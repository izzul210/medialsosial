import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import './Profile.scss';
import Loading from '../../pages/loading';


//Redux stuff
import { connect } from 'react-redux';
import {logoutUser, uploadImage } from '../../redux/actions/userAction';

//MUI stuff
import MuiLink from '@material-ui/core/Link';
import Typography  from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
    // send to server
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  }

    render() {
        const { 
            user: {
                credentials: {handle, imageUrl, bio, website, location},
                loading,
                authenticated
            }
        } = this.props;
        
        let profileMarkUp = !loading ? (authenticated ? (
          
              <Card className='card'>
                <div className='profile'>
                    <div  className="image-wrapper">
                        <img src={imageUrl} className='profile-pic' alt=''/>
                        <input 
                          type="file" 
                          id="imageInput"  
                          hidden="hidden"
                          onChange={this.handleImageChange}
                          />
                          <button className="editPicture" title='Edit profile picture' onClick={this.handleEditPicture}>
                               <i class="fa fa-camera" aria-hidden="true"></i>
                          </button>
                    </div>

                    <div className="profile-details">
                      <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
                          @{handle}
                      </MuiLink>
                      <hr/>
                      {bio && <Typography variant="body2">{bio}</Typography>}
                      {location && (
                        <Fragment>
                            <div className="locationInfo"/> 
                            <span className="info">{location}</span>
                          <hr/>
                        </Fragment> 
                      )}
                      {website && (
                          <Fragment>
                              <div className="websiteInfo"/>
                              <a href={website} target="_blank" rel="noopener noreferrer">
                                  {' '}{website}
                              </a>
                              <hr/>
                          </Fragment>
                      )}
                        {/* <div className="calendarInfo"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span> */}
                    </div>

                    <div className='profile_buttons'>
                      <button className="logout" title='Log out' onClick={this.handleLogout}>
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                      </button>
                      <EditDetails />
                    </div>
              
                </div>
              </Card>
            
            ):(
              <Card className='nonUserCard'>
                    <Typography variant="body2" align="center">
                        No profile found. Shame. 
                    </Typography>
                    <div className='buttons'>
                      <MyButton tip=''>
                          <Link to="/login">
                            <button className='nonprofile-login'>
                            <Typography variant="body2" align="center" className='fontButton'>
                              Login 
                            </Typography>
                            </button>
                          </Link>     
                      </MyButton>
                      <MyButton tip=''>
                          <Link to="/signup">
                              <button className='nonprofile-signup'>
                              <Typography variant="body2" align="center" className='fontButton'>
                                Sign Up
                            </Typography>
                              </button>
                        </Link>     
                      </MyButton>
                    </div>
                </Card>
            )): 
            (
            <div>
            <Loading/>
            </div>
            )

        return profileMarkUp;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);

//INCASE IF YOU NEED TO LOGOUT
/*
          <MyButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="secondary" />  
              </MyButton>
*/