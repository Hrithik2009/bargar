const express = require('express');
const router = express.Router();

const {getHome, getShop} = require('../controllers/homeController');
const {login, register} = require('../controllers/authController');
const {getCart, updateCart} = require('../controllers/customers/cartController')

router.route('/').get(getHome);
router.route('/cart').get(getCart);
router.route('/update-cart').post(updateCart);
router.route('/shop').get(getShop);

router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

router.get('/single-product', (req, res) => res.render('single-product'));
router.get('/checkout', (req, res) => res.render('checkout'));

router.route('/login').get(login);
router.route('/register').get(register);

module.exports = router;