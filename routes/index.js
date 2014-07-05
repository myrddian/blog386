var express = require('express');
var router = express.Router();
var logic = require('../logic/blog_logic');

/* GET home page. */
router.get('/', function(req, res) {
   logic.get_blog_config(function(blog_config){
       //We got the blog config here now we need to
       //get the list of blog items
       var loglogin = "Login";
       var log_url = "login";
       if (req.isAuthenticated()) {
           loglogin = "Logout";
           log_url = "logout";
       }
       logic.get_latest_post(blog_config,function(posts){
           res.render('index', { title: blog_config.blog_name ,
                                log_state: loglogin,
                                log_url:  log_url,
                                bloglist: posts});

       })


   })
});

module.exports = router;
