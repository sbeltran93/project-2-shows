// middleware/pass-user-to-view.js

const passUserToView = (req, res, next) => {
    console.log(req.session.user)
    res.locals.user = req.session.user ? req.session.user : null
    console.log(res.locals.user)
    next()
  }
  
  module.exports = passUserToView