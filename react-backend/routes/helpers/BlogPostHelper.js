class BlogPostHelper
{
    test()
    {
        return "t";
    }

    getMostRecentBlog(blogPosts)
    {
        let isSooner = this.isSooner.bind(this);
        let recentPost = null;
        blogPosts.forEach(function(post) {
            if(!recentPost)
            {
                recentPost = post;
            }else{
                if(isSooner(post.postDate, recentPost.postDate))
                {
                    recentPost = post;
                }
            }
        });
    }

    /**
     * Returns true if d1 is sooner than d2
     * @param d1
     * @param d2
     * @returns {boolean}
     */
    isSooner(d1, d2)
    {
        return Date.parse(d1) > Date.parse(d2);
    }

    /**
     * Sorts posts, most recent first.
     * @param posts
     */
    sortPosts(posts) {
        posts.sort(function (a, b) {
            var keyA = new Date(a.postDate),
                keyB = new Date(b.postDate);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
    }

    removeUnpublished(posts)
    {
        let publishedPosts = [];
        posts.forEach(function(post){
            if(post.isPublished)
            {
                publishedPosts.push(post);
            }
        });
        posts = publishedPosts;
    }

}

module.exports = BlogPostHelper;