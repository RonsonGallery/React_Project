import Post from '../Models/post_model'
import { Request,Response } from 'express'
/**
 * Gets all the posts
 * @param {HTTP request} req
 * @param {HTTP response} res
 */

const getAllPosts = async (req : Request,res : Response)=>{
   console.log('getAllPosts')

   try{
    const sender = req.query.sender
    let posts
    if(sender != null || sender != undefined ){
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


const getPostById = async (req : Request,res : Response)=>{
    console.log('getPostById id=' + req.params.id)
    const id = req.params.id
    if (id == null || id == undefined){
        return res.status(400).send({'err':'no id provided'})
    }

    try{
        const post = await Post.findById(id)
        if (post == null){
            res.status(400).send({
                'err': 'post doesnot exists'
            })
        }else{
            res.status(200).send(post)
        }
    }catch(err){
        res.status(400).send({
            'err': err.message
        })
    }
}

/**
 * Create new post
 * @param {HTTP request} req
 * @param {HTTP response} res
 */




const createNewPost = async (req : Request,res : Response) =>{
    console.log(req.body)

    const post = new Post({
        message : req.body.message,
        sender : req.body.sender
    })


    try{
        const newPost = await post.save()
        res.status(200).send(newPost)
    }
    catch(err){
        res.status(400).send({
            'status' : 'failed',
            'err' :err.message})

    }
    

};

/**
 * Create new post
 * @param {HTTP request} req
 * @param {HTTP response} res
 */


const deletePostById = async (req : Request,res : Response)=>{
    console.log('getPostById id=' + req.params.id)
    const id = req.params.id
    if (id == null || id == undefined){
        return res.status(400).send({'err':'no id provided'})
    }

    try{
        await Post.deleteOne({"_id" : id})
        res.status(200).send()
    }catch(err){
        res.status(400).send({
            'err': err.message
        })
    }
}


export = {
    getAllPosts,
    createNewPost,
    getPostById,
    deletePostById,
}
