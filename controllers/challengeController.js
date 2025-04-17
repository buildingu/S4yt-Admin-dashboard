const Challenge = require('../models/challenge');
const Business = require('../models/business');
const mongoose = require('mongoose');

exports.createChallenge = async (req, res) => {
    try {
    const {businessId } = req.params;
      const { title, description } = req.body;
  
      if (!title || !description || !businessId) {
        return res.status(400).json({ error: 'Title, description, and business are required.' });
      }
      const business = await Business.findOne({admin_business_id: businessId})
      const newChallenge = new Challenge({
        title,
        description,
        business: business._id,
        admin_business: new mongoose.Types.ObjectId(businessId)
      });
  
      const savedChallenge = await newChallenge.save();
      res.status(201).json(savedChallenge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create challenge', details: error.message });
    }
  };

  exports.updateChallenge = async (req, res) => {
    try {
      const { businessId } = req.params;
      const { title, description } = req.body;
  
      const business = await Business.findOne({ admin_business_id: businessId });
  
      const filter = {
        business: business._id,
        admin_business: new mongoose.Types.ObjectId(businessId)
      };
  
      let existingChallenge = await Challenge.findOne(filter);
  
      const updatedChallenge = await Challenge.findOneAndUpdate(
        filter,
        { $set: { title, description } },
        { new: true, upsert: true, runValidators: true }
      );
  
      if (!existingChallenge) {
        business.challenge_question = updatedChallenge._id;
        await business.save();
      }
  
      res.status(200).json(updatedChallenge);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update or create challenge',
        details: error.message
      });
    }
  };
  