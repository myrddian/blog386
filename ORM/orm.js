/*
This is the layer that talks to the database
 */

var pg = require('pg');
var configuration = require('../config.js');

var Q = require('q');

var conString = process.env.DATABASE_URL || configuration.db_type+"://"+configuration.db_username+"@localhost/"+configuration.db_name;
console.info('Connection string: '+conString);

var client = new pg.Client(conString);
if(client.connect() == null) {
    console.info('orm.js::Connected to DB');
}
else {
    console.error('orm.js::Failed to connect to DB');
}

module.exports.connection_string = conString;

module.exports.get_user_object=function(username, callback){

    var query = client.query("select * from blog_user where user_name=$1", [username], function(err,result){

        if(result.rowCount == 0){
            callback(err,new Error('No such user'));
            return;
        }

        var row = result.rows[0];
        var return_values = {username: row.user_name,
            userpasswd: row.user_password,
            usersalt: row.user_salt,
            userstate: row.user_state,
            useremail: row.user_email,
            userid: row.user_id};

        callback(err,return_values);


    }); //end call back from client.query
}


module.exports.get_blog_posts = function(count,callback){

    var query = client.query("select * from blog_post ORDER BY post_date DESC LIMIT $1 ",[count] ,function(err,result){

        blog_list = [];

        if(result.rowCount == 0){
            callback(err,new Error('No Posts'));
            return;
        }

        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows[i];
            console.info(row.user_name) ;

            blog_list.push(row);

        }
        callback(err,blog_list);


    });

}


module.exports.get_blog_by_id = function(id,callback){

    var query = client.query("select * from blog_post where post_id=$1",[id], function(err,result){

        if(result.rowCount == 0){
            callback(err,new Error('No Such Post'));
            return;
        }
        var row = result.rows[0];
        callback(err,row);
    });
}

module.exports.get_blog_config = function(callback){

    var query = client.query("select * from blog_config", function(err,result){

        if(result.rowCount == 0){
            callback(err,new Error('No blog config!!!1'));
            console.info('ERROR - Unable to locate blog_config!');
            return;
        }

        var row = result.rows[0];
        callback(err,row);

    });

}


module.exports.update_blog_post = function(post_id, post_content, post_title){

    var query = client.query("UPDATE blog_post SET post_content=$1, post_title=$2 WHERE post_id=$3",
        [post_content,post_title,post_id], function(err,result){

        if(!err){
            console.log('ERROR - '+err.toString());
        }

    });

}


module.exports.new_blog_entry = function(user_name, user_id, post_title, post_content){

    var query = client.query("INSERT INTO blog_post (post_content,post_title,user_id, user_post, post_date) VALUES ($1,$2,$3,$4,$5)",
     [post_content,post_title,user_id,user_name, new Date()], function(err,result){

            if(!err){
                console.log('ERROR - '+err.toString());
            }

        });
    //console.log(query.text);
}



module.exports.pgConnect =  function(callback) {
    pg.connect('tcp://nodepg:password@localhost/pgstore',
        function (err, client) {
            if (err) {
                console.log(JSON.stringify(err));
            }
            if (client) {
                callback(client);
            }
        }
    );
};