import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from './HomePage'
import BlogPage from './BlogPage'
import BlogPostPage from './BlogPostPage'
import MediaPage from './MediaPage'
import Login from './../components/Login'
import './Pages.css';

class PageFactory extends Component {

    render()
    {
        return (
            <div id="page-body" className="page-body">
                <Switch>
                    return <Route exact path='/' component={HomePage}/>
                    return <Route path='/blog/:blogId?' component={BlogPage}/>
                    return <Route path='/media' component={MediaPage}/>
                    return <Route exact path='/contact' component={HomePage}/>
                    return <Route path='/new-blog/:blogId?' component={BlogPostPage}/>
                    return <Route path='/login' component={Login}/>
                </Switch>
            </div>
        );
    }
}

export default PageFactory;
