const express = require('express');
const Users = require('./userDb.js')
const shortid = require('shortid')
const Posts = require("../posts/postDb.js")
const router = express.Router();

router.post('/',validateUser, (req, res) => {
  // do your magic!
  let newUser = req.body
    // newUser.id = shortid.generate();
    Users.insert(newUser)
    .then(entry=>{
      res.status(201).json(newUser)
    })
    .catch(error=>{
      console.log(error)
      res.status(500).json({message:"Error adding user"})
    })
});

router.post('/:id/posts',validatePost,validateUserId, (req, res) => {
  // do your magic!
    // const user = Users.getById(req.params.id)
    // //  Posts.insert(user,req.body)
    // // Posts.insert(req.body)
    // const insert = {user_id:user,
    //                 text:req.body}  
    // // console.log(req.params)

    const newPost = { ...req.body, user_id: req.params.id}
     
    
    Posts.insert(newPost)
    .then(entry=>{
      res.status(201).json({message:"Post added"})
    })
    .catch(error=>{
      console.log(error)
      res.status(500).json({message:"Error adding post"})
    })

});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message:"Error retrieving users"})
  })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({message:"There was an error with the DB"})
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  // const {id} = req.params.id
   Users.getUserPosts(req.params.id)
   .then(user=>{
     res.status(200).json(user)
   })
   .catch(error=>{
     console.log(error)
     res.status(500).json({message:"There was an error retrieving user posts"})
   })
});

router.delete('/:id', validateUserId,  (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count=>{
    res.status(200).json({message:"the User has been deleted"})
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({message:"Error removing the User"})
  })
});

router.put('/:id', validateUserId,validateUser,  (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user=>{
     res.status(200).json({message:"user updated"})
    })
  .catch(err=>{
    res.status(500).json({message:"error updating user"})
  })  
});

//custom middleware

function validateUserId(req, res, next) {
 // do your magic!
 const {id} = req.params;

 Users.getById(id)
 .then(user=>{
   if(user){
     req.user = user;
     next()
   }
   else{
     next(res.status(404).json({message: "user not found"}))
   }
 })
 .catch(err=>{
   console.log(err)
   res.status(500).json({message: "error with the DB"})
 })
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body && Object.keys(req.body).length>0){
    next()
  }
  else{
    next(res.status(400).json({message:"please include a user name"}))
  }
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
