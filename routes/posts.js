const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')

//to get all the posts from DB
router.get('/', async (req, res) => {
    try{
        const viewPosts= await Post.find()
        res.json(viewPosts)
    } catch(err){
        res.json({message: err})
    }
})

//to get a single(specific) post from DB

router.get('/:postID', async (req, res) =>{
try {
let specificPost =  await Post.find(
    {"$or":[
    {"_id": {$in: [mongoose.Types.ObjectId(req.params.postID)]}},
    {"title": {$regex : ".*" + req.params.postID + ".*"}},
    {"description" : {$regex : ".*" + req.params.postID + ".*"}}]})
res.json(specificPost)
} catch(err) {
    res.json({message: err})
}})

router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router