const verifyAdmin = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Unauthorized admin access' });
  }
  next();
};

export default verifyAdmin;