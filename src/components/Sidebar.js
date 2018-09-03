import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id:this.props.id,
            expanded: false
        }

        this.numberOfPostsToRetrieve = 15;

    }

    componentDidMount()
    {
        // loadRecentBlogPosts(this.numberOfPostsToRetrieve);
    }



    expand()
    {
        let dropDown = document.getElementById(this.props.id)
        let dropDownList = document.getElementById("blog-post-list-" + this.props.id)
        console.log(dropDownList);
        if(this.state.expanded)
        {
            dropDown.classList.remove("side-bar-expand");
            dropDownList.setAttribute("hidden", true);
        }else{
            dropDown.classList.add("side-bar-expand");
            dropDownList.removeAttribute("hidden");
        }
        this.state.expanded = !this.state.expanded;
    }

    render() {
        let expand = this.expand.bind(this);
        return (
            <div id={this.props.id} className="side-bar">
                <div id={"blog-post-list-" + this.props.id} className={"blog-post-list"} hidden>
                    <ul>
                        <li><a href={"/blog/4"}>Post 4</a></li>
                        <li><a href={"/blog/5"}>Post 5</a></li>
                        <li><a href={"/blog/6"}>Post 6</a></li>
                    </ul>
                </div>
                <div className={"dropdown-button"} onClick={expand}> </div>
            </div>
        );
    }
}

export default Sidebar;



