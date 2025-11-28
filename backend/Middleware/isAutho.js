const isAutho = (role) => {
    return (req, res, next) => {
      if (!req.userRole) {
        return res.status(401).json({ message: "User role not found." });
      }
  
      if (req.userRole !== role) {
        return res
          .status(403)
          .json({ message: "You do not have permission for this action." });
      }
  
      next();
    };
  };
  
  module.exports = isAutho;
  