import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import './Advertisement.scss';
import Loading from '../../pages/loading';
import adsImg from '../../images/ads.jpg';

//Redux stuff
import { connect } from 'react-redux';
import {logoutUser, uploadImage } from '../../redux/actions/userAction';

//MUI stuff
import Card from '@material-ui/core/Card';

class Advertisement extends Component {
    render() {
        const { 
            user: {
                loading,
            }
        } = this.props;
        
        let profileMarkUp = !loading ? (
            <Card className='card'>
                <div className='ads_card'>
                    <h4>Advertisement</h4>
                    <div className="ads_img">
                        <img src={adsImg} alt=""></img>
                    </div>
                </div>
              </Card> 
            ): (
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

Advertisement.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Advertisement);

//INCASE IF YOU NEED TO LOGOUT
/*
          <MyButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="secondary" />  
              </MyButton>
*/