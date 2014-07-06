var express = require('express');
var router = express.Router();
nonce_gen = require('nonce')();
var logic_layer = require('../logic/blog_logic');


module.exports.new_post_render=function(req,res){

    logic_layer.get_blog_config(function(blog_config){

        //Get the config information
        var logged_out_visible = "";
        var logged_in_visible = "display:none;";
        if (req.isAuthenticated()) {
            logged_out_visible = "display:none;";
            logged_in_visible = "";
        }

        res.render('edit-post', { nonce: nonce_gen(),
            post_title: 'Post Title',
            theme: blog_config.blog_theme,
            post_state: 'New',
            title: blog_config.blog_name ,
            logged_out_visible: logged_out_visible,
            logged_in_visible:  logged_in_visible,
            post_content: 'Post Content......'});

    });


}


module.exports.new_post_submit=function(req,res){

    var post_title = req.body.edit_post_title;
    var post_content = req.body.edit_post_content;
    var user_id = req.user.userid;
    var user_name = req.user.username;
    //console.log('New Post');
    logic_layer.new_post(post_title,post_content,user_name,user_id);
    res.redirect('/');

}