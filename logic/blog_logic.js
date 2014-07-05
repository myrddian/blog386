/*
    Purpose of this file is to seperate the queueing mechanism from the DB function calls
    and have the logic of the blog in this directory
 */

var Q = require('q');
var orm = require('../orm/orm');
var validator = require('validator');

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

        console.log(promises);
        callback(promises);

    });

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




module.exports.get_latest_post = function(blog_config,callback){

    db_get_new_post_handler(blog_config).then(function(promises){
       console.log(promises);
        callback(promises);
    });

}

module.exports.get_blog_config = function(callback){

    db_get_blog_config().then(function(promises){

        console.log(promises);
        callback(promises);

    });

}


module.exports.get_post = function(post_id, callback){

    db_get_post_by_id(post_id).then(function(promises){
        console.log(promises);
        callback(promises);
    });

}

module.exports.modify_post = function(post_id,post_title, post_content){
    console.log('updating post');
    orm.update_blog_post(post_id,post_content,post_title);
}


module.exports.new_post = function(post_title, post_content, username,userid){
    console.log('inserting new post');
    orm.new_blog_entry(username,userid,post_title,post_content);
}

