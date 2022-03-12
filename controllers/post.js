

/**
 * Gets all the posts
 * @param {HTTP request} req
 * @param {HTTP response} res
 */

const getAllPosts = (req,res)=>{
    res.send('app get post')
}

/**
 * Create new post
 * @param {HTTP request} req
 * @param {HTTP response} res
 */

const createNewPost = (req,res) =>{
    res.send('app post post')
};

module.exports = {
    getAllPosts,
    createNewPost
}
