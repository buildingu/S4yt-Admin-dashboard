const User = require('../models/user');
const Business = require('../models/business');
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
    const business =  user.role == "Business"? await Business.findOne({business_user_id: user._id}).select('_id'): null;
    const token = jwt.sign({ userId: user._id, roles: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userData = { //no password
      _id: user._id,
      email: user.email,
      role: user.roles,
      businessName: business?.business_name, 
      businessId: business?._id
    }
    

    res.status(200).json({ token, userData});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
