module.exports = {
  checkLogin(req, res, next) {
    if(!req.session.user) {
      req.flash()
    }
  }
}