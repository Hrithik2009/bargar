const getCart = (req, res) => {
    res.render('cart');
}

const updateCart = async(req, res) => {
    // console.log(req.body.menu);
    /*
        Structure:
        let cart = {
            items: {
                id: {
                    item: object,   
                    qty: int
                },
            },
            totalQty: 0,
            totalPrice: 0
        }
    */
    try{
        if(!req.session.cart){ // There is no object of cart in the session
            req.session.cart = {
                items: {},
                totalQty: 0,
                totalPrice: 0
            }
        }

        let cart = req.session.cart;
        if(!cart.items[req.body.menu._id]){
            cart.items[req.body.menu._id] = {
                item: req.body.menu,
                qty: 1
            }
            cart.totalQty += 1;
            cart.totalPrice += req.body.menu.price;
        }
        else{
            cart.items[req.body.menu._id].qty += 1;
            cart.totalQty +=1;
            cart.totalPrice += req.body.menu.price;
        }

        res.json({totalQty: req.session.cart.totalQty});
    }catch (err) {
        res.status(500).json({msg: err});
    }   
}

module.exports = {getCart, updateCart}