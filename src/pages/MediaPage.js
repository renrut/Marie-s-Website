import React, { Component } from 'react';
import Particles from 'react-particles-js';
import {Route} from 'react-router-dom'

import './Pages.css';

class HomePage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }


    componentDidMount(){
    }

    render() {
        return (
            <div className="media-page">
                <h1 className="coming-soon-title">{"Coming Soon"}</h1>
            </div>
        );
    }
}

export default HomePage;
