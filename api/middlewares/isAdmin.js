const isAdmin = (req, res, next) => {
    if (req.userRole === 'admin') {
      return next();
    }
    return res.status(403).json({
      error: 'You have to be admin',
    });
  };
  
  module.exports = isAdmin;