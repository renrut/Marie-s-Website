import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id:this.props.id
        }

        this.numberOfPostsToRetrieve = 15;

    }

    componentDidMount()
    {
        // loadRecentBlogPosts(this.numberOfPostsToRetrieve);
    }



    expand()
    {

    }

    render() {
        return (
            <div id={this.props.id} className="side-bar">
                <img className="picture" src={this.state.picture} alt=""/>
            </div>
        );
    }
}

export default Sidebar;



