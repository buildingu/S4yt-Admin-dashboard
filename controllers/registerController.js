const User = require('../models/user');
const Business = require('../models/business');

const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const {businessName, email, password } = req.body;
    console.log(req.body
    );
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({email, password: hashedPassword });
    const business = new Business({business_user_id: user._id, business_name: businessName})

    await user.save();
    await business.save();

    res.status(201).json({ message: 'User registered successfully', user, business });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
