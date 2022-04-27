const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user-model')
const mongoose = require('mongoose')

const siteURI = process.env.NODE_ENV === 'production'
    ? 'https://fierce-headland-13867.herokuapp.com/u/google/redirect'
    : 'http://localhost:4000/u/google/redirect'

//I think this and next function are what are listening to recieve cookies with user data and then release it when we're done?
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

//grabbing user info from Google and creating a user in the DB with it.
passport.use(
    new GoogleStrategy({
        clientID: '508265478606-dan5o8b9nc6vprv0412npga30nq3rui8.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: siteURI
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
        .then(currentUser => {
            if(currentUser) {
                console.log('user is: ', currentUser)
                done(null, currentUser)
            } else {
                User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile._json.email
                })
                .then(newUser => {
                    console.log('created a new user: ', newUser)
                    done(null, newUser)
                })
            }
        })
    })
)

