const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const {name, email, password } = req.body;
    console.log(req.body
    );
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
