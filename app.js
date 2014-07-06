/**
 * Module dependencies.
 */
"use strict";
var logger = require('./logger');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var connect = require('connect');
var crypto = require('crypto');
var params = require('express-params')


var routes = require('./routes/index');
var users = require('./routes/users');
var http = require('http');
var orm = require('./ORM/orm.js')
var config = require('./config.js');

var edit_post = require('./routes/edit_post');
var blog_logic = require('./logic/blog_logic');

var session = require('express-session');
var login = require('./routes/login');

var passport = require('passport');
var admin = require('./routes/admin');
var users = require('./routes/users');
var pages = require('./routes/page');

var app = express();
params.extend(app);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Setup a session store

console.info('Starting session store');
//connect.session({ store: new PGStore(orm.pgConnect), secret: 'keyboard cat'});
//var PGStore = require('connect-pg');
//app.use(express.session({store: new PGStore(orm.pgConnect), secret: 'keyboard cat'}));


var pgSession = require('connect-pg-simple')(session);

app.use(session({
    store: new pgSession({
        conString : process.env.DATABASE_URL ||  orm.connection_string
    }),
    saveUninitialized: true,
    resave: true,
    secret: process.env.APP_COOKIE_SECRET || config.cookie_secret,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.
            orm.get_user_object(username, function(err,query){

                if (query.constructor.name === "Error") {
                    return done(null, false, { message: 'Unknown user ' + username });
                }

                var pwd_hash = crypto.createHash('sha256').update(password +config.security_key+query.usersalt).digest('hex');
                //console.log(pwd_hash);
                if (pwd_hash === query.userpasswd) {
                    //If the user state is zero the user is locked out
                    if(query.user_state==0){
                        return done(null, false, { message: 'Unknown user ' + username });
                    }
                    done(null, query);
                }else {
                    return done(null, false, { message: 'Invalid password' });
                }

            });
        });
    }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

/*
Configure the routes here
 */

var new_post_handler = require('./routes/new_post');

app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}



app.use('/', routes);

app.get('/edit_post/:id', isLoggedIn,function(req, res) {
    edit_post.edit_post(req.params.id,req,res);
});

app.post('/edit_post/:id', isLoggedIn ,function(req,res){
    edit_post.edit_post_post(req.params.id,req,res);
})


app.get('/newpost',isLoggedIn,new_post_handler.new_post_render);
app.post('/newpost', isLoggedIn,new_post_handler.new_post_submit);

app.get('/login',login.login_form_get);
app.post('/login',passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login' }));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


app.get('/admin', isLoggedIn, admin.admin_page_render);
app.post('/admin', isLoggedIn,admin.admin_page_post);


app.get('/users',isLoggedIn,users.user_page_render);
app.post('/users',isLoggedIn,users.user_page_add_user);
app.get('/users/:id',isLoggedIn,function(req,res){
    users.get_user_page(req.params.id,req,res);
});

app.post('/users/:id',isLoggedIn,function(req,res){
    users.user_page_modify_user(req.params.id,req,res);
});

app.get('/page/:page_url',function(req,res){
    var page_url = req.params.page_url;
    pages.page_render(page_url,req,res);
});


app.get('/page/edit/:page_url',isLoggedIn,function(req,res){
    var page_url = req.params.page_url;
    pages.page_edit_get(page_url,req,res);
});

app.post('/page/edit/:page_url',isLoggedIn,function(req,res){
    var page_url = req.params.page_url;
    pages.page_modify_save(page_url,req,res);
});

//leave the default handlers for the moment

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', config.port);

//Get the config





module.exports = app;

/*http.createServer(app).listen(app.get('port'), function(){
    console.log('App.js:: Express server listening on port ' + app.get('port'));
    //logger.info('App.js:: Express Server Started Succesfully');
});*/
