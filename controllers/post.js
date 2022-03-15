const Post = require('../models/post_model')

/**
 * Gets all the posts
 * @param {HTTP request} req
 * @param {HTTP response} res
 */

const getAllPosts = async (req,res)=>{
   console.log('getAllPosts')

   try{
    const sender = req.query.sender
    var posts
    if(sender != null | sender != undefined ){
        posts = await Post.find({'sender':sender})
    }else{
        posts = await Post.find()
    }
    res.status(200).send(posts)
   }
   catch(err){
    res.status(400).send({
        'status' : 'failed',
        'err' :err.message
    })
   }

}

const getPostById = async (req, res)=>{
    console.log('gGetPostById id=' + req.params.id)
    const id = req.params.id

    if (id == null | id == undefined){
        res.status(400).send({'error': 'no id provided'}) 
    }

    try{
        post = Post.findById(id)
        res.status(200).send(post)
    }
    catch(err){
        res.status(400).send({
            'status' : 'failed',
            'err' :err.message
        })
    }
}

/**
 * Create new post
 * @param {HTTP request} req
 * @param {HTTP response} res
 */




const createNewPost = async (req,res) =>{
    console.log(req.body)

    const post = Post({
        message : req.body.message,
        sender : req.body.sender
    })


    try{
        newPost = await post.save()
        res.status(200).send(newPost)
    }
    catch(err){
        res.status(400).send({
            'status' : 'failed',
            'err' :err.message})

    }
    

};


module.exports = {
    getAllPosts,
    createNewPost,
    getPostById
}
