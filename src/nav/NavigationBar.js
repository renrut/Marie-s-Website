import React, { Component } from 'react';
import {Route, withRouter, NavLink} from 'react-router-dom'
import './NavigationBar.css';

class NavigationBar extends Component
{
    constructor(props)
    {
        super(props);

        this.siteTabs = this.props.tabs
    }

    getPath(pathname)
    {
        let path = pathname;
        return path.includes("/",1) ? path.substring(0, path.indexOf("/", 1)) : path;
    }

    render()
    {

        return (
            <div className="nav-link-container">
                <div className="nav-bar">
                    <a className="nav-brand">Marie Armbruster</a>
                    <div className="nav-link-container">
                        {this.siteTabs.map((page)=>{
                            // return <a onClick={callCallback} key={page.name + "-nav"} className="nav-item" href='javascript:void(0);'><span data-name={page.name} id={page.name + "-nav"} className={this.props.activePage === page.name ? "active-nav" : "inactive-nav"}>{page.title}</span></a>
                            return(
                            <NavLink className="nav-item" key={page.name + "-nav"} to={"/" + page.link}>
                                {console.log(this.getPath(this.props.location.pathname))}
                                    <span className={this.getPath(this.props.location.pathname) === ("/" + page.link) ? "active-nav" : "inactive-nav"} data-name={page.name} id={page.name + "-nav"}>{page.title}</span>
                            </NavLink>);
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(NavigationBar);
