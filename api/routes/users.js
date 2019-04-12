const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
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
                        rs.status(500).json({
                            error : err
                        });
                    });
                }
            });
        }
    })
    .catch();

    
});

module.exports = router