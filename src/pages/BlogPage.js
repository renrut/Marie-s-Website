import React, { Component } from 'react';
import Markdown from 'react-markdown';

import './Pages.css';
import Sidebar from "../components/Sidebar";


class BlogPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            title:"Loading...",
            text:""
        }
        this.fillBlogPost = this.fillBlogPost.bind(this);
    }

    componentDidMount()
    {
        let postId = this.props.match.params.blogId !== undefined ? this.props.match.params.blogId : "";
        console.log(postId);
        this.populateBlogPost(postId);
    }

    populateBlogPost(postNum)
    {
        let self = this;
        fetch("/v1/post/"+postNum).then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
            return {postTitle:"Sorry! This blog post could not be found!", postText:""};
        }).then(function(myJson) {
            self.fillBlogPost(myJson);
        });
    }

    fillBlogPost(blogData)
    {
        this.setState
        ({
            title: blogData.postTitle,
            text: blogData.postText,
        });
    }


    render()
    {
        return (
            <div className="blog-page">
                <Sidebar id={"blog-side-bar"}/>
                <div id="blog-image">
                </div>
                <div className="home-title-container">
                    <h1 className="home-title">{this.state.title}</h1>
                </div>
                <div className="underline"/>
                <div className="home-text-container">
                    <Markdown className="blog-post" source={this.state.text} />
                </div>
            </div>
        );
    }
}

export default BlogPage;
