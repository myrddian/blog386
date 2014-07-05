var express = require('express');
var router = express.Router();
nonce_gen = require('nonce')();
var logic_layer = require('../logic/blog_logic');


module.exports.new_post_render=function(req,res){

    logic_layer.get_blog_config(function(blog_config){

        var loglogin = "Login";
        var log_url = "login";
        if (req.isAuthenticated()) {
            loglogin = "Logout";
            log_url = "logout";
        }

        res.render('edit-post', { nonce: nonce_gen(),
            post_title: 'Post Title',
            post_state: 'New',
            title: blog_config.blog_name ,
            log_state: loglogin,
            log_url:  log_url,
            post_content: 'Post Content......'});

    });


}


module.exports.new_post_submit=function(req,res){

    var post_title = req.body.edit_post_title;
    var post_content = req.body.edit_post_content;
    var user_id = req.user.userid;
    var user_name = req.user.username;
    console.log('New Post');
    logic_layer.new_post(post_title,post_content,user_name,user_id);
    res.redirect('/');

}