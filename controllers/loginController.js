const User = require('../models/adminuser');
const Business = require('../models/adminbusiness');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    let business = null;
    if (user.roles[0] === "business") {
      business = await Business.findOne({
        business_user_id: user._id,
        deleted: { $ne: true }
      }).select('_id business_name');
      
      if (!business) {
        return res.status(403).json({ message: 'Business account is inactive or deleted.' });
      }
    }

    const token = jwt.sign(
      { userId: user._id, roles: user.roles[0] },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const userData = {
      _id: business?._id || user._id,
      email: user.email,
      role: user.roles,
      businessName: business?.business_name,
      businessId: business?._id
    };

    res.status(200).json({ token, userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
