import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { username },
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
