import React, { Component } from 'react';
import './Picture.css';

class Picture extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            picture:this.props.picture
        };
    }

    render() {
        console.log(this.state.picture);
        return (
            <div className="picture-container">
                <img className="picture" src={this.state.picture} alt=""/>
            </div>
        );
    }
}

export default Picture;



