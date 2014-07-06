var express = require('express');
var router = express.Router();
var logic_layer = require('../logic/blog_logic');
var nonce_gen = require('nonce')();
var orm = require('../ORM/orm');

module.exports.user_page_render = function (req, res) {

    logic_layer.get_blog_config(function (blog_config) {

        //Get the config information
        var logged_out_visible = "";
        var logged_in_visible = "display:none;";
        if (req.isAuthenticated()) {
            logged_out_visible = "display:none;";
            logged_in_visible = "";
        }
        logic_layer.get_all_users(function(users){

            //Start Rendering
            res.render('users', { nonce: nonce_gen(),
                    theme: blog_config.blog_theme,
                    title: blog_config.blog_name ,
                    logged_out_visible: logged_out_visible,
                    logged_in_visible:  logged_in_visible,
                    userlist: users}
            );

        });



    });
}

module.exports.get_user_page = function(user_id, req,res){

    logic_layer.get_blog_config(function (blog_config) {

        //Get the config information
        var logged_out_visible = "";
        var logged_in_visible = "display:none;";
        if (req.isAuthenticated()) {
            logged_out_visible = "display:none;";
            logged_in_visible = "";
        }
        orm.get_user_object_by_id(user_id,function(err,users){

            //Start Rendering
            res.render('user_edit', { nonce: nonce_gen(),
                    theme: blog_config.blog_theme,
                    title: blog_config.blog_name ,
                    logged_out_visible: logged_out_visible,
                    logged_in_visible:  logged_in_visible,
                    edit_user_name: users.username,
                    edit_user_email: users.useremail,
                    edit_user_state: users.userstate,
                    user_id: users.userid}
            );

        });



    });

}


module.exports.user_page_modify_user = function(user_id, req, res){

    var user_email = req.body.edituseremail;
    var user_passwd = req.body.edituserpassword;
    var user_state = req.body.edituserstate;
    var user_name = req.body.editusername;

    logic_layer.save_user_changes(user_id,user_name,user_passwd,user_state,user_email);
    res.redirect('/users');


}

module.exports.user_page_add_user = function(req,res){

    var user_name = req.body.newusername;
    var user_password = req.body.newuserpassword;
    var user_email = req.body.newuseremail;

    //logic_layer.modify_post(id,post_title,post_content);
    logic_layer.add_user_to_system(user_name,user_password,user_email);
    res.redirect('/users');

}