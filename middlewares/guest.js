function guest(req, res, next) {
    if(!req.isAuthenticated()){
        next()
    }
    res.redirect('/')
}

module.exports = {guest}