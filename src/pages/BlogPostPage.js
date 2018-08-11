import React, { Component } from 'react';
import Markdown from 'react-markdown';

import './Pages.css';


class BlogPostPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            title: "",
            blogPost: "Blog Post. This supports markdown! For a markdown cheatsheet, see https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf",
            isPublished: false
        };
        this.blogTitlePlaceholder = "Title";

        this.handleChange = this.handleChange.bind(this);
        this.saveB = this.saveBlog.bind(this, false);
        this.publishBlog = this.publishBlog.bind(this);
        this.unpublishBlog = this.unpublishBlog.bind(this);
        this.previewBlog = this.previewBlog.bind(this);
        this.populateForms = this.populateForms.bind(this);
    }

    componentDidMount()
    {
        let populateForms = this.populateForms;
        let postId = this.props.match.params.blogId;
        if(postId) {
            fetch("/v1/post/" + postId).then(function (response) {
                if (response.status === 200) {
                    return response.json();
                }
            }).then(function (data) {
                populateForms(data);
            });
        }
    }

    populateForms(data)
    {
        console.log(this);
        this.setState({
            title:data.postTitle,
            blogPost:data.postText,
            isPublished: data.isPublished
        });
    }

    saveBlog(publish)
    {
        console.log("saving");
        //Save blog to ddb
        //Generate id
        //populate id in address bar
        let post = this.buildPost();
        post.publish = publish;

        let url = post.postId ? "/v1/post/" + post.postId : "/v1/post";
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(post),
        })

    }

    buildPost()
    {
        let post = {
            postTitle: this.state.title,
            postText: this.state.blogPost
        }
        return post;
    }

    publishBlog()
    {
        this.saveBlog(true);
        //Publishing blog
    }
    unpublishBlog()
    {
        this.saveBlog(false);
    }

    previewBlog()
    {
        //save blog as unpublished
        //load blog page with Id
        console.log("preview");
    }

    /**
     * Handles form change and sets it to respective state (given name);
     * @param event
     */
    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render()
    {
        return (
            <div className="blog-post-page">
                <form className={"post-form"}>
                    <div className={"post-elements title-input-container"}>
                        <input className={"title-input"} name={"title"} type="text" placeholder={this.blogTitlePlaceholder} value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className={"post-elements"}>
                        <textarea className={"post-input"} name={"blogPost"} onChange={this.handleChange} value={this.state.blogPost}/>
                    </div>
                    <div className={"post-buttons"}>
                        {(this.state.isPublished)?
                            <input className={"post-button"} type="button" value="Unpublish" onClick={this.unpublishBlog}/>
                        :
                            <input className={"post-button"} type="button" value="Publish" onClick={this.publishBlog}/>
                        }
                        <input className={"post-button"} type="button" value="Save" onClick={this.saveB}/>
                        <input className={"post-button"} type="button" value="Preview" onClick={this.previewBlog}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default BlogPostPage;
