import React, { Component } from 'react';
import NavigationBar from './nav/NavigationBar';
import Picture from './components/Picture';
import PageFactory from "./pages/PageFactory";
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            activePage:"home"
        };
        this.sitePages = [
            {title: "Home", link:"home", name:"home"},
            {title: "Blog", link:"blog", name:"blog"},
            {title: "Media", link:"media", name:"media"},
            {title: "Contact", link:"contact", name:"contact"}
        ];
        this.pageChanged = this.pageChanged.bind(this)
    }

    pageChanged(activePage){
        this.setState
        ({
            activePage : activePage
        });
        this.forceUpdate();
    };

    render() {
        return (
            <div className="App">
                <div className="side-app">
                    <Picture picture={"img/climbing.png"}/>
                </div>
                <div className="body-app">
                    <NavigationBar activePage={this.state.activePage} tabs={this.sitePages} pageChangeCB={this.pageChanged}/>
                    <PageFactory activePage={this.state.activePage}/>
                </div>
            </div>
        );
    }
}

export default App;
