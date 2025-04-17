const User = require('../models/adminuser');
const AdminBusiness = require('../models/adminbusiness');
const Business = require('../models/business');

const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { businessName, email, password} = req.body;
    if (!businessName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    const adminbusiness = new AdminBusiness({ business_user_id: user._id, business_name: businessName })
    const business = new Business ({admin_business_id: adminbusiness._id, name: businessName })
    await user.save();
    await adminbusiness.save();
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
