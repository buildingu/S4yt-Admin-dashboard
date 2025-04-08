const Answer = require('../models/answers');
const Challenge = require('../models/challenge.js')
const mongoose = require('mongoose');
const Business = require('../models/business');
const { checkIfExists } = require('../utils/modelUtils');


exports.getBusinessAnswers = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await checkIfExists(Business, businessId);

    if (!business)
      return res.status(404).json({ message: "Business not found or already deleted" });
    const challenge = await Challenge.findOne({ business: new mongoose.Types.ObjectId(businessId) });

    if (!challenge || challenge.length === 0)
      return res.status(404).json({ message: "No challenge found for this business" });

    const winnerUserIds = business.winners.map(winner => winner.user);

    const answers = await Answer.aggregate([
      {
        $match: {
          challenge_id: challenge._id,
          deleted: { $ne: true },
          user: { $nin: winnerUserIds }
        }
      },
      {
        $sort: { rating: -1 }
      },
      {
        $project: {
          submission_link: 1,
          rating: 1,
          challenge_id: 1,
          user: 1
        }
      }
    ]);

    res.status(200).json(answers);
  } catch (error) {
    console.error('Error fetching business answers:', error);
    res.status(500).json({ message: 'Error fetching business answers', error });
  }
};
exports.updateAnswerRatings = async (req, res) => {
  try {
    const { answerId } = req.params;

    const { rating } = req.body;


    const answer = await Answer.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(answerId) },
      { $set: { rating: rating } },
      { new: true }
    );

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating answer rating', error });
  }
}

