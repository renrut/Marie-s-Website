import React, { Component } from 'react';
import './NavigationBar.css';

class NavigationBar extends Component
{
    constructor(props)
    {
        super(props);

        this.blogTabs = this.props.tabs

        this.changePageCB = this.props.pageChangeCB;
    }

    changePage(event)
    {
        let clickedElementName = event.target.dataset.name;
        if(clickedElementName != null)
        {
            this.changePageCB(clickedElementName);
        }

    }

    render()
    {
        let callCallback = this.changePage.bind(this);
        return (
            <div className="nav-link-container">
                <div className="nav-bar">
                    <a className="nav-brand">Marie Armbruster</a>
                    <div className="nav-link-container">
                        {this.blogTabs.map((page)=>{
                            return <a onClick={callCallback} key={page.name + "-nav"} className="nav-item" href='javascript:void(0);'><span data-name={page.name} id={page.name + "-nav"} className={this.props.activePage === page.name ? "active-nav" : "inactive-nav"}>{page.title}</span></a>
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

export default NavigationBar;
