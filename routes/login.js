var express = require('express');
var router = express.Router();
nonce_gen = require('nonce')();
var logic_layer = require('../logic/blog_logic');
var crypto = require('crypto');



module.exports.login_form_get=function(req,res){

    logic_layer.get_blog_config(function(blog_config){

        res.render('login', { title: blog_config.blog_name ,
                nonce: nonce_gen()});
    });

}

module.exports.login_form_post=function(req,res){

}