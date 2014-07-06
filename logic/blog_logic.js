/*
    Purpose of this file is to seperate the queueing mechanism from the DB function calls
    and have the logic of the blog in this directory
 */

var Q = require('q');
var orm = require('../orm/orm');
var validator = require('validator');
var crypto = require('crypto');
var uuid = require('node-uuid');
var config = require('../config');

db_get_blog_config = function(){

    var deferred = Q.defer();
    orm.get_blog_config(function(error,results){
        if(error) {
            deferred.reject(new Error(error));
        }
        else {
            deferred.resolve(results);
        }
    });
    return(deferred.promise);

}

module.exports.get_blog_config = function(callback){

    db_get_blog_config().then(function(promises){

        //console.log(promises);
        callback(promises);

    });

}


db_get_all_users_handler = function(){
    var deferred = Q.defer();
    orm.get_all_users(function(error,results){
        if (error) {
            deferred.reject(new Error(error));
        }
        else {
            deferred.resolve(results);
        }
    });
    return(deferred.promise);
}

db_get_new_post_handler = function(blog_config){

   // db_get_blog_config(function(blog_config){
        var deferred = Q.defer();
        orm.get_blog_posts(blog_config.blog_display_amount,function(error,results){
            if (error) {
                deferred.reject(new Error(error));
            }
            else {
                deferred.resolve(results);
            }
        });
        return(deferred.promise);
    //});
}


db_get_post_by_id = function(blog_id){

    var deferred = Q.defer();
    orm.get_blog_by_id(blog_id,function(error,results){

        if(error){
            deferred.reject(new Error(error));
        }
        else {
            deferred.resolve(results);
        }
    });
    return(deferred.promise);

}

db_get_page_by_url = function(page_url){
    var deferred = Q.defer();
    orm.get_page_by_name(page_url,function(error,results){

        if(error){
            deferred.reject(new Error(error));
        }
        else {
            deferred.resolve(results);
        }
    });
    return(deferred.promise);
}


module.exports.get_latest_post = function(blog_config,callback){

    db_get_new_post_handler(blog_config).then(function(promises){
        //console.log(promises);
        callback(promises);
    });

}

module.exports.get_blog_config = function(callback){

    db_get_blog_config().then(function(promises){

        //console.log(promises);
        callback(promises);

    });

}


module.exports.get_post = function(post_id, callback){

    db_get_post_by_id(post_id).then(function(promises){
        //console.log(promises);
        callback(promises);
    });

}

module.exports.modify_post = function(post_id,post_title, post_content){
    //console.log('updating post');
    orm.update_blog_post(post_id,post_content,post_title);
}


module.exports.new_post = function(post_title, post_content, username,userid){
    //console.log('inserting new post');
    orm.new_blog_entry(username,userid,post_title,post_content);
}


module.exports.modify_config = function(blog_name, blog_count, blog_theme){
    console.log('modifying config');
    orm.update_blog_config(blog_name,blog_count,blog_theme);
}

module.exports.get_all_users = function(callback){
    db_get_all_users_handler().then(function(promise){
        //console.log(promise);
        callback(promise);
    });
}


module.exports.add_user_to_system = function(username, userpassword, useremail){

    var salt = uuid.v4();
    var pwdhash = crypto.createHash('sha256').update(userpassword +config.security_key+salt).digest('hex');
    orm.insert_new_user_record(username,pwdhash,salt,useremail,1);

}

module.exports.get_page_by_url = function(page_url, callback){
    db_get_page_by_url(page_url).then(function(promise){
        callback(promise);
    });
}


module.exports.save_page_changes_by_url = function(page_url, page_title, page_content){
    orm.save_page_changes_by_url(page_url,page_title,page_content);
}


module.exports.save_user_changes = function(user_id, user_name, user_password, user_state, user_email){
    var salt = uuid.v4();
    var pwdhash = crypto.createHash('sha256').update(user_password +config.security_key+salt).digest('hex');
    orm.save_user_page_changes(user_id,user_name,pwdhash,user_email,user_state,salt);
}

