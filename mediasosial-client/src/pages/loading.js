import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
    render(){
        return(
          <div className="general">
              <div className="loader"></div>
          </div>  
        )
    }
}

export default Loading;