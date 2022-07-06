const Menu = require('../models/menu')

const getHome = async(req, res) => {
    let menu = await Menu.find();
    res.render('index', {menus: menu});
}

const getShop = async(req, res) => {
    let menu = await Menu.find();
    res.render('shop', {menus: menu});
}

module.exports = {getHome, getShop}