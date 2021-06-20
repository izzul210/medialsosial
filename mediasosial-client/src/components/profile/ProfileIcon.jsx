import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProfileIcon.scss';
import Loading from '../../pages/loading';


//Redux stuff
import { connect } from 'react-redux';
import {logoutUser, uploadImage } from '../../redux/actions/userAction';

//MUI stuff
import MuiLink from '@material-ui/core/Link';

class ProfileIcon extends Component {
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
                credentials: {handle, imageUrl},
                loading,
                authenticated
            }
        } = this.props;
        
        let profileMarkUp = !loading ? (authenticated ? (
                <div className="profileicon_div"> 
                    <MuiLink component={Link} to={`/users/${handle}`}>
                        <img src={imageUrl} className='navbar_profile' alt=''/>
                        <p>{handle}</p>
                    </MuiLink>
                </div>             
            
            ):( null )): (
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

ProfileIcon.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(ProfileIcon);