import React, { Component } from 'react';

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

        this.postId = null;
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
        this.postId = this.props.match.params.blogId;
        if(this.postId) {
            fetch("/v1/post/" + this.postId).then(function (response) {
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
        console.log(data);
        this.setState({
            title: data.postTitle,
            blogPost: data.postText,
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

        let url = this.postId ? "/v1/post/" + this.postId : "/v1/post";
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
        }).then(
            (data) => data.json()
        ).then(function(id){
            if(publish){
                window.location.replace("/blog/" + id)
            }else{
                window.location.replace("/new-blog/" + id)
            }
        });

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
                            <div>
                                <input className={"post-button"} title={"Remove Publishing"} type="button" value="Unpublish" onClick={this.unpublishBlog}/>
                                <input className={"post-button"} title={"Save & Publish Changes"} type="button" value="Save" onClick={this.publishBlog}/>
                            </div>
                        :
                            <div>
                                <input className={"post-button"} title={"Unpublish Post"} type="button" value="Publish" onClick={this.publishBlog}/>
                                <input className={"post-button"} title={"Save & Don't Publish"} type="button" value="Save" onClick={this.saveB}/>
                                <input className={"post-button"} title={"Preview Without Publishing"} type="button" value="Preview" onClick={this.previewBlog}/>
                            </div>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default BlogPostPage;
