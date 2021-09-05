
const middleware = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/signin");
  },
};

export default middleware;
