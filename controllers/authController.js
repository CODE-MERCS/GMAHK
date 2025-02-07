const { registerUser, findUserByEmailOrPhone } = require('../services/authService');
const { generateToken } = require('../configs/jwt');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, name, password, role, phone } = req.body; 
  if (!email || !name || !password || !role || !phone) { 
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Cek apakah email atau phone sudah terdaftar
    const userExists = await findUserByEmailOrPhone(email, phone);
    if (userExists) {
      let message = 'Email already exists';
      if (userExists.phone === phone) message = 'Phone number already exists';
      return res.status(400).json({ message });
    }

    const user = await registerUser(email, name, password, role, phone); 
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await findUserByEmailOrPhone(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: user.id, role: user.role });
    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  logout,
};
