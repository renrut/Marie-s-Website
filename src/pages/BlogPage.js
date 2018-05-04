import React, { Component } from 'react';
import './Pages.css';

class BlogPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            title:"",
            text:""
        }
        this.fillBlogPost = this.fillBlogPost.bind(this);
    }

    getMostRecentBlogPost(){

    }

    componentDidMount(){
        let postNum = 1;
        let post = this.populateBlogPost(postNum);
    }

    populateBlogPost(postNum)
    {
        let self = this;
        fetch("/v1/post/1d").then(function(response) {
            return response.json();
        }).then(function(myJson) {
            self.fillBlogPost(myJson);
        });
    }



    fillBlogPost(blogData)
    {
        console.log(blogData);
        this.setState({title:blogData.postTitle, text:blogData.postText});
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
