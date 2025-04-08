const Challenge = require('../models/challenge');

exports.createChallenge = async (req, res) => {
    try {
    const {businessId } = req.params;
      const { title, description } = req.body;
  
      if (!title || !description || !business) {
        return res.status(400).json({ error: 'Title, description, and business are required.' });
      }
  
      const newChallenge = new Challenge({
        title,
        description,
        business: new mongoose.Types.ObjectId(businessId)
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
  
      const updatedChallenge = await Challenge.findOneAndUpdate(
        { business: businessId }, 
        { $set: { title, description } },  
        { new: true, upsert: true, runValidators: true }  
      );
  
      res.status(200).json(updatedChallenge);  
    } catch (error) {
      res.status(500).json({ error: 'Failed to update or create challenge', details: error.message });
    }
  };