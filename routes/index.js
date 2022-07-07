const express = require('express');
const router = express.Router();

const {getHome, getShop} = require('../controllers/homeController');
const {login, postLogin, register, postRegister, logout} = require('../controllers/authController');
const {getCart, updateCart} = require('../controllers/customers/cartController')
const {guest} = require('../middlewares/guest')

router.route('/').get(getHome);
router.route('/cart').get(getCart);
router.route('/update-cart').post(updateCart);
router.route('/shop').get(getShop);

router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

router.get('/single-product', (req, res) => res.render('single-product'));
router.get('/checkout', (req, res) => res.render('checkout'));

router.route('/login', guest).get(login);
router.route('/login').post(postLogin);
router.route('/register', guest).get(register);
router.route('/register').post(postRegister);
router.route('/logout').post(logout);

module.exports = router;