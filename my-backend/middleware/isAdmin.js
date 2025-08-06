// backend/middleware/isAdmin.js
const isAdmin = (req, res, next) => {
  const adminEmail = "admin2004@gmail.com";

  if (req.user && req.user.email === adminEmail) {
    next(); // ✅ user is admin
  } else {
    res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
};

export default isAdmin;
