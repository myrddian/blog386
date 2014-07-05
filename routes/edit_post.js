var express = require('express');
var router = express.Router();
nonce_gen = require('nonce')();
var logic_layer = require('../logic/blog_logic');

/* GET home page. */
/*router.get('/', function(req, res) {
    res.render('edit-post', { nonce: nonce_gen(),
                              post_title: 'Express',
                              post_content: ' Lore et Ipsum skadjlkajdal;dkjaldjlakjdl;kajdl;kjalkdjalkjfdlskjfl;ksdjfl;ksjl;fjslfjksdl'});
});      */

module.exports.edit_post=function(id,req,res){

    logic_layer.get_blog_config(function(blog_config){
        logic_layer.get_post(id,function(post){
            var loglogin = "Login";
            var log_url = "login";
            if (req.isAuthenticated()) {
                loglogin = "Logout";
                log_url = "logout";
            }
            res.render('edit-post', { nonce: nonce_gen(),
                post_title: post.post_title,
                post_state: 'Edit',
                title: blog_config.blog_name ,
                log_state: loglogin,
                log_url:  log_url,
                post_content: post.post_content});
        });
    });


}


module.exports.edit_post_post = function(id,req,res){

    var post_title = req.body.edit_post_title;
    var post_content = req.body.edit_post_content;

    logic_layer.modify_post(id,post_title,post_content);
    res.redirect('/');

}