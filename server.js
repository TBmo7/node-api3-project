const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const timestamp = require('log-timestamp')

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(morgan('dev'));
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



//custom middleware

function logger(req, res, next) {
  
  // let a = Date.now()
  // let yy = a.getFullYear()
  // let mm = a.getMonth()
  // let dd = a.getDate()
  // let hh = a.getHours()
  // let min = a.getMinutes()
  // let ss = a.getSeconds()
  // let ms = a.getMilliseconds()


  // // const currentTime = Date.now()

  // const currentTime = yy +" /" + mm + " /" + dd +" -- " + hh + ":" + min +" :"+ ss +" :"+ ms
  //  console.log(currentTime)
  
  console.log(req.method, req.url)
  next();
}

module.exports = server;
