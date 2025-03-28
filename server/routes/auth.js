const express = require('express');
const router = express.Router();
const passport = require('passport');

//Authenticate with google
//GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//Google auth callback
//GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Redirect to the React front end after successful authentication
        res.redirect('http://localhost:3000/dashboard'); // Replace with your React app's URL
    }
);

//Check Authentication from React
//GET /auth/user
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});

//Logout
//GET /auth/logout
router.get('/logout', (req, res) => {
    console.log(req.session); // Debugging: Check if session exists
    req.logout(() => {
        console.log('User has logged out.')
        req.session.destroy((err) => {
            if (err) console.log('Error : Failed to destroy the session during logout.', err)
            req.user = null
            // Clear the cookie on the client side
            res.clearCookie('connect.sid', { path: '/' })   
            console.log('User has logged out and session destroyed.');
            res.json({ message: 'User is logged out' });
        })
    })
});

module.exports = router;