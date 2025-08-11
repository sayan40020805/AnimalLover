// middleware/isAdmin.js

export const isAdmin = (req, res, next) => {
  try {
    // Check if user is logged in and has isAdmin flag true
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    res.status(500).json({ message: "Server error in admin check" });
  }
};
