const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const secret = 'secret';

exports.users_signup = (req, res, next) => {
    User.find({
        email : req.body.email
    }).exec()
    .then( user =>{
        if(user.length >=1){
            res.status(409).json({
                message : "Email already exists"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                }
                else{
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password : hash
                    });
                    user.save()
                    .then( result => {
                        console.log(result);
                        res.status(201).json({
                            message : 'user created'
                        });
                    })
                    .catch( err =>{
                        res.status(500).json({
                            error : err
                        });
                    });
                }
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    });   
}

exports.user_delete = (req, res, next) =>{
    User.remove({
        _id : req.params.id
    }).exec()
    .then( result =>{
        res.status(200).json({
            message : 'User Deleted'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })

}

exports.user_login = (req,res,next) =>{
    User.find({
        email : req.body.email
    }).exec()
    .then( user =>{
        if(user.length<1){
            return res.status(404).json({
                message : 'Auth Failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message : 'Auth failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id
                }, secret, 
                {
                    expiresIn : "1h"
                }
                )
                return res.status(200).json({
                    message : 'Auth Successful',
                    token : token
                });
            }
            return res.status(401).json({
                message : 'Auth failed',
            });

        })
    })
    .catch();
}