const Business = require('../models/business');
const Answer = require('../models/answers');
const { checkIfExists } = require('../utils/modelUtils');

exports.getBusinesses = async (req, res) => {
    try {
        const business = await Business.find({deleted: false });
        if (!business) return res.status(404).json({ message: 'Businesses not found' });

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching businesses', error });
    }
};
exports.getBusinessAnswers = async (req, res) => {
    try {
        const { businessId } = req.params;
        const answers = await Answer.find({ challenge_id: businessId })
          .populate("user", "name email") 
          .sort({ rating: -1 }); 
    
        res.status(200).json({ success: true, data: answers });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
}

exports.getBusinessById = async (req, res) => {
    const id = req.params.id;
    try {
        const business = await Business.findOne({ _id: id, deleted: false });
        if (!business) return res.status(404).json({ message: 'Business not found' });

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching business', error });
    }
};


exports.updateBusiness = async (req, res) => {
    const id = req.params.id;
    const { name, description, logo, question, youtubeLink } = req.body;
    try {
        if (!(await checkIfExists(Business, id)))
            return res.status(404).json({ message: 'Business not found or already deleted' });

        const updatedBusiness = await Business.findByIdAndUpdate(
            id,
            {
                name: name,
                description: description,
                logo_s4yt: logo,
                question_main: question, 
                youtube_link: youtubeLink
            },
            { new: true }
        );
        if (!updatedBusiness) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json(updatedBusiness);
    } catch (error) {
        res.status(500).json({ message: 'Error updating business', error });
    }
};

exports.deleteBusiness = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBusiness = await Business.findByIdAndUpdate(id, { deleted: true });
        if (!deletedBusiness) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting business', error });
    }
};


