const ValidationErrors = require('../errors/ValidationErrors')

class BlogPostValidator{

    isPostValid(post)
    {
        let errorArray = [];

        if(!post.title)
        {
            errorArray.push(ValidationErrors.INVALID_TITLE_ERROR)
        }
        if(!post.text)
        {
            errorArray.push(ValidationErrors.INVALID_BLOG_TEXT_ERROR)
        }

        if(!post.tags)
        {
            errorArray.push(ValidationErrors.INVALID_TAGS_ERROR)
        }

        return errorArray;
    }
}

module.exports = BlogPostValidator;