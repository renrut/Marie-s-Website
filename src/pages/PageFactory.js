import React, { Component } from 'react';
import HomePage from './HomePage'
import BlogPage from './BlogPage'

import './Pages.css';

class PageFactory extends Component {

    getPage()
    {
        if (this.props.activePage === 'home'){
            return <HomePage></HomePage>
        } else if (this.props.activePage === 'blog') {
            return <BlogPage></BlogPage>
        } else {
            return <HomePage></HomePage>
        }
    }

    render()
    {
        return (
            <div id="page-body" className="page-body">
                {this.getPage()}
            </div>
        );
    }
}

export default PageFactory;
