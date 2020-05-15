const express = require('express');
const Posts = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message: "error retrieving posts"})
  })
});

router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post=>{
    res.status(200).json(post)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message:"There was an error with the DB"})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count=>{
    res.status(200).json({message:"the post has been deleted"})
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({message:"Error removing the post"})
  })
});

router.put('/:id',validatePostId,validatePost, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post=>{
     res.status(200).json({message:"post updated"})
    })
  .catch(err=>{
    res.status(500).json({message:"error updating post"})
  })  
});



// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params;

  Posts.getById(id)
  .then(post=>{
    if(post){
      req.post = post;
      next()
    }
    else{
      next(res.status(404).json({message: "post not found"}))
    }
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({message: "error with the DB"})
  })
}

function validatePost(req,res,next){
  if(req.body && Object.keys(req.body).length>0){
    next()
  }
  else{
    next(res.status(400).json({message:"please include a post body"}))
  }
}

module.exports = router;
