'use strict';

var express = require('express');
var async               = require('async');

var bodyParser = require('body-parser');
var User = require('../models/user');
ar Verify = require('./verify');
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
            
        });
    });



module.exports = userRouter;