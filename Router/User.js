const router = require('express').Router()
const auth = require('../Middleware/auth')
const { signup, login } = require('../Controller/User/auth');

router
    .route('/')
    // auth ->  get users
    // auth ->  delete user
    // auth ->  patch user

router
    .route('/signup')
    .post(signup)

router
    .route('/login')
    .post(login)

module.exports = router;