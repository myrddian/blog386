var express = require('express');
var router = express.Router();
var logic_layer = require('../logic/blog_logic');
var nonce_gen = require('nonce')();


module.exports.admin_page_render = function (req, res) {

    logic_layer.get_blog_config(function (blog_config) {

        //Get the config information
        var logged_out_visible = "";
        var logged_in_visible = "display:none;";
        if (req.isAuthenticated()) {
            logged_out_visible = "display:none;";
            logged_in_visible = "";
        }

        var select_386 = '';
        var goecities_select ='';
        var twitter_select = '';

        if(blog_config.blog_theme === '386'){
             select_386 = 'selected';
             goecities_select ='';
             twitter_select = '';
        }

        if(blog_config.blog_theme === 'Twitter'){
            select_386 = '';
            goecities_select ='';
            twitter_select = 'selected';
        }

        if(blog_config.blog_theme === 'Geocities'){
            select_386 = '';
            goecities_select ='selected';
            twitter_select = '';
        }



        //Start Rendering
        res.render('admin', { nonce: nonce_gen(),
            theme: blog_config.blog_theme,
            title: blog_config.blog_name ,
            logged_out_visible: logged_out_visible,
            logged_in_visible:  logged_in_visible,
            blog_welcome: blog_config.blog_welcome_text,
            blog_name: blog_config.blog_name,
            blog_count: blog_config.blog_display_amount}
           );

    });


}


module.exports.admin_page_post = function(req,res){

    var blog_name = req.body.edit_blog_name;
    var blog_count = req.body.edit_blog_count;
    var blog_theme = req.body.theme_select;

    logic_layer.modify_config(blog_name,blog_count,blog_theme);
    res.redirect('/admin');

}
