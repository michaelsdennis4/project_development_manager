var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoDB = require('mongodb');
var bcrypt = require('bcryptjs');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));

app.use(session({secret: 'H4URYB34H3HFI3UFI3IU',
    saveUninitialized: true,
    resave: true}));
app.use(express.static('public'));

var MongoClient = MongoDB.MongoClient;
var ObjectId    = MongoDB.ObjectID;
var mongoUri    = process.env.MLAB_URI_PROJECT_MANAGER;

var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

MongoClient.connect(mongoUri, function(error, db) {
    if (error) {
        throw error;
    } else {
        console.log('connected to MongoDB');
    }

    app.post('/authenticate', function(req, res) {
        db.collection('users').find({email: req.body.email}).toArray(function(error, results) {
            if ((error) || (results.length !== 1)) {
                res.json({message: 'Incorrect username/password'});
            }
            else {
                var user = results[0];
                if (bcrypt.compareSync(req.body.password, user.password_digest) === true) {
                    session = req.session;
                    session.user_id = user._id;
                    user.first_name = user.first_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
                    user.last_name = user.last_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
                    session.username = user.first_name +' '+user.last_name;
                    res.json({message: 'ok'});
                } else {
                    res.json({message: 'Incorrect username/password'});
                }
            }
        });
    });

    app.get('/logged', function(req, res) {
        if ((req.session.user_id) && (req.session.username)) {
            res.json({message: 'ok'});
        } else {
            res.json({message: 'login'});
        }
    });

    app.get('/logout', function(req, res) {
        delete req.session.user_id;
        delete req.session.username;
        console.log('user logged out');
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
                res.json({message: err});
            } else {
                res.json({message: 'ok'});
            }
        });
    });

    app.get('/users', function(req, res){
        db.collection('users').find({_id: ObjectId(req.session.user_id)}).toArray(function(error, users) {
            if (users.length === 1) {
                res.json({user: users[0]})
            } else {
                res.json({message: 'User not found'});
            }
        });
    });

    app.post('/users', function(req, res){
        db.collection('users').find({email: req.body.email}).toArray(function(error, users) {
            if (users.length > 0) {
                res.json({message: 'User already exists'});
            }
            else if (req.body.password != req.body.confirm_password) {
                res.json({message: 'Passwords do not match'});
            }
            else if (req.body.first_name.length === 0) {
                res.json({message: 'First name cannot be blank'});
            }
            else if (req.body.last_name.length === 0) {
                res.json({message: 'Last name cannot be blank'});
            } else if (req.body.email.length === 0) {
                res.json({message: 'Email cannot be blank'});
            }
            else if (req.body.password.length < 6) {
                res.json({message: 'Password must be at least 6 characters.'});
            }
            else {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                var new_user = {first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password_digest: hash};
                db.collection('users').insertOne(new_user, function(error, result) {
                    if ((!error) && (result)) {
                        session = req.session;
                        session.user_id = new_user._id;
                        new_user.first_name = new_user.first_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
                        new_user.last_name = new_user.last_name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
                        session.username = new_user.first_name +' '+new_user.last_name;
                        res.json({message: 'ok'});
                    } else {
                        res.json({message: 'Error creating user'});
                    }
                });
            }
        });
    });

    app.patch('/users', function(req, res) {
        if ((req.session.user_id) && (req.session.user_id != null)) {
            if ((req.body.first_name) && (req.body.first_name.length === 0)) {
                res.json({message: 'First name cannot be blank'});
            }
            else if ((req.body.last_name) && (req.body.last_name.length === 0)) {
                res.json({message: 'Last name cannot be blank'});
            }
            else if ((req.body.email) && (req.body.email.length === 0)) {
                res.json({message: 'Email cannot be blank'});
            }
            else {
                var updates = {};
                if (req.body.first_name) {
                    updates.first_name = req.body.first_name;
                }
                if (req.body.last_name) {
                    updates.last_name = req.body.last_name;
                }
                if (req.body.email) {
                    updates.email = req.body.email;
                }
                if (Object.keys(updates).length > 0) {
                    db.collection('users').updateOne({_id: ObjectId(req.session.user_id)}, {
                        $set: updates
                    }, function (error, result) {
                        if (!error) {
                            //update session
                            db.collection('users').find({_id: ObjectId(req.session.user_id)}).toArray(function(error, users) {
                                if (users.length === 1) {
                                    var user = users[0];
                                    var first_name = user.first_name.replace(/\w\S*/g, function (txt) {
                                        return txt.charAt(0).toUpperCase() + txt.substr(1);
                                    });
                                    var last_name = user.last_name.replace(/\w\S*/g, function (txt) {
                                        return txt.charAt(0).toUpperCase() + txt.substr(1);
                                    });
                                    req.session.username = first_name + ' ' + last_name;
                                    res.json({message: 'ok'});
                                } else {
                                    res.json({message: 'login'});
                                }
                            });
                        } else {
                            res.json({message: 'Error updating profile'});
                        }
                    });
                } else {
                    res.json({message: 'No updates found'});
                }
            }
        } else {
            res.json({message: 'login'});
        }
    });

    app.patch('/password', function(req, res) {
        if ((req.session.user_id) && (req.session.user_id != null)) {
            //find user
            db.collection('users').find({_id: ObjectId(req.session.user_id)}).toArray(function(error, results) {
                if ((!error) && (results) && (results.length > 0)) {
                    var user = results[0];
                    //check if existing password is correct
                    if (bcrypt.compareSync(req.body.old_password, user.password_digest) === true) {
                        //check if password at least 6 characters
                        if (req.body.new_password.length >= 6) {
                            //check if new passwords match
                            if (req.body.new_password === req.body.confirm_new_password) {
                                //try to update password
                                var salt = bcrypt.genSaltSync(10);
                                var hash = bcrypt.hashSync(req.body.new_password, salt);
                                db.collection('users').update({_id: ObjectId(user._id)}, {$set: {password_digest: hash}}, function(error, result) {
                                    if ((!error) && (result)) {
                                        res.json({message: 'ok'});
                                    } else {
                                        res.json({message: 'Error updating password'});
                                    }
                                });
                            } else {
                                res.json({message: 'New passwords do not match'});
                            }
                        } else {
                            res.json({message: 'Password must be at least 6 characters.'});
                        }
                    } else {
                        res.json({message: 'Existing password incorrect'});
                    }
                } else {
                    res.json({message: 'login'});
                }
            });
        } else {
            res.json({message: 'login'});
        }
    });

    app.get('/projects', function(req, res) {
        if ((req.session.user_id) && (req.session.user_id != null)) {
            db.collection('users').find({_id: ObjectId(req.session.user_id)}).toArray(function(error, users) {
                if (users.length === 1) {
                    var user = users[0];
                    if (user.projects && user.projects.length > 0) {
                        res.json({message: 'ok', projects: user.projects});
                    } else {
                        res.json({message: "No projects found."});
                    }
                } else {
                    res.json({message: 'User not found'});
                }
            });
        } else {
            res.json({message: 'login'});
        }
    });

    app.post('/projects', function(req, res) {
        if ((req.session.user_id) && (req.session.user_id != null)) {
            if (req.body.title.length === 0) {
                res.json({message: 'Project must have a title.'});
            } else {
                var newProject = {
                    _id: ObjectId(),
                    title: req.body.title,
                    description: req.body.description,
                    repo: req.body.repo,
                    url: req.body.url
                };
                db.collection('users').updateOne({_id: ObjectId(req.session.user_id)},
                    {$push: {projects: newProject}}, function(error, results) {
                        if (!error) {
                            res.json({message: 'ok'});
                        } else {
                            res.json({message: 'Error creating course.'});
                        }
                    });
            }
        } else {
            res.json({message: 'login'});
        }
    });

    app.get('*', function(req, res) {
        res.sendFile("index.html", { root: '.' });
    });

});

module.exports = app;