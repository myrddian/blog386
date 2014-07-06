var express = require('express');
var router = express.Router();
var logic = require('../logic/blog_logic');

module.exports.page_render = function(page_name, req,res){
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

        logic.get_page_by_url(page_name, function(result){
                res.render('page', { title: blog_config.blog_name ,
                    theme: blog_config.blog_theme,
                    logged_out_visible: logged_out_visible,
                    logged_in_visible:  logged_in_visible,
                    page_title: result.page_title,
                    post_content: result.page_content,
                    post_user: result.page_author });
        });



    });
}


module.exports.page_edit_get = function (page_name,req,res ){

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

        logic.get_page_by_url(page_name, function(result){
            res.render('page_edit', { title: blog_config.blog_name ,
                theme: blog_config.blog_theme,
                logged_out_visible: logged_out_visible,
                logged_in_visible:  logged_in_visible,
                page_title: result.page_title,
                page_content: result.page_content,
                page_user: result.page_author });
        });



    });

}

module.exports.page_modify_save = function (page_name, req,res ) {

    var page_title = req.body.edit_page_title;
    var page_content = req.body.edit_page_content;

    logic.save_page_changes_by_url(page_name,page_title,page_content);
    res.redirect('/page/'+page_name);

}