'use strict';

var express = require('express');
var async               = require('async');

var bodyParser = require('body-parser');
var User = require('../models/user');
var Counters = require('../models/counters');
var Experiences = require('../models/experiences');
var Skills = require('../models/skills');
var Educations = require('../models/educations');
var Verify = require('./verify');
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;

var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/signup')

    .post(function (req, res, next) {
        User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            Counters.getNextSequence('user', function(err1, result){
                req.body.id = result.seq;
            User.findOneAndUpdate({_id : user._id}, req.body, {new : true, upsert:true}, function (err, user) {
                if (err) {
                    User.remove({username: req.body.username}, function (err, result) {
                        return res.status(500).send({message: 'A user with the given E-mail is already registered'});
                    });
                }
                passport.authenticate('local')(req, res, function () {
                    var token = Verify.getToken({"username": user.username, "_id":user._id, "role": user.role});

                    res.status(200).send({
                        message: 'Login successful',
                        success: true,
                        user: user,
                        token: token
                    });
                });
            })
            })
        });
    });

userRouter.route('/login')

    .post(function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.status(500).send(err);
            }

            if (info) {
                return res.status(401).send(info);
            }

            if(!user) {
                return res.status(401).send(info);
            }

            req.logIn(user, function (err) {
                if (err){
                    return res.status(500).send(err);
                }
            });
            var token = Verify.getToken({"username": user.username, "_id":user._id, "role": user.role});
             Experiences.find({user_id: user.id}).lean().exec( function (err, exp) {
                    if (err) {
                        return res.status(500).send(err);
                    }else{
                                      
                                         var userForMap = JSON.parse(JSON.stringify(user));
                                        const obj = Object.assign({experiences: exp }, userForMap);
                                         return res.status(200).send({
                                            message: 'Login successful',
                                            success: true,
                                            user: obj,
                                            token: token
                                        });
                                  
                    }
                    
                });
           
        })(req, res, next);
    });

userRouter.route('/update')

    .put(function (req, res, next) {
        var exp = req.body.experiences;
        var expArr = [];
       
                    User.findOneAndUpdate({_id: req.body._id}, req.body, {new : true, upsert:true}, function (err, userRes) {
                        if (err) {
                            return res.status(500).send(err);
                        }else{
                            var userForMap = JSON.parse(JSON.stringify(userRes));
                             const obj = Object.assign({experiences: expArr }, userForMap);
                          console.log("\r\n\\n obj ", obj, expArr);
                        return res.status(200).send(obj);
                        }
                                  
                       
                    })
               
       
    });




module.exports = userRouter;