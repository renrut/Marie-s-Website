import React, { Component } from 'react';
import './Pages.css';

class BlogPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
        }
    }

    getMostRecentBlogPost(){

    }

    componentDidMount(){
    }

    render() {
        return (
            <div className="blog-page">
                <div id="blog-image">
                </div>
                <div className="home-title-container">
                    <h1 className="home-title">{this.state.title}</h1>
                </div>
                <div className="underline"/>
                <div className="home-text-container">
                    <h1 className="home-title">{this.state.text}</h1>
                </div>
            </div>
        );
    }
}

export default BlogPage;
