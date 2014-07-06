var express = require('express');
var router = express.Router();
var logic = require('../logic/blog_logic');

/* GET home page. */
router.get('/', function(req, res) {
   logic.get_blog_config(function(blog_config){
       //We got the blog config here now we need to
       //get the list of blog items
       //Get the config information
       var logged_out_visible = "";
       var logged_in_visible = "display:none;";
       if (req.isAuthenticated()) {
           logged_out_visible = "display:none;";
           logged_in_visible = "";
       }
       logic.get_latest_post(blog_config,function(posts){
           res.render('index', { title: blog_config.blog_name ,
                                theme: blog_config.blog_theme,
                                welcome_text:  blog_config.blog_welcome_text,
                                logged_out_visible: logged_out_visible,
                                logged_in_visible:  logged_in_visible,
                                bloglist: posts});

       })


   })
});

module.exports = router;
