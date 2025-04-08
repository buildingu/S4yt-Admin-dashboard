const User = require('../models/adminuser');
const Business = require('../models/business');

const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    const business = new Business({ business_user_id: user._id, business_name: name })

    await user.save();
    await business.save();
    const userData = { //no password
      _id: user._id,
      email: user.email,
      role: user.roles
    }
    res.status(201).json({ message: 'User registered successfully', userData, business });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
