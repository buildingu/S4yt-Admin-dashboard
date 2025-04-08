const Business = require('../models/business');
const { checkIfExists } = require('../utils/modelUtils');

exports.getBusinesses = async (req, res) => {
    try {
        const business = await Business.find({ deleted: false });
        if (!business) return res.status(404).json({ message: 'Businesses not found' });

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching businesses', error });
    }
};


exports.getBusinessById = async (req, res) => {
    const id = req.params.id;
    try {

        const business = await checkIfExists(Business, id);
        if (!business) {
            return res.status(404).json({ message: "Business not found or already deleted" });
        }
        return res.status(200).json(business );
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

        res.status(200).json(updatedBusiness);
    } catch (error) {
        res.status(500).json({ message: 'Error updating business', error });
    }
};

exports.deleteBusiness = async (req, res) => {
    const id = req.params.id;
    try {
        if (!(await checkIfExists(Business, id)))
            return res.status(404).json({ message: 'Business not found or already deleted' });

        const deletedBusiness = await Business.findByIdAndUpdate(id, { deleted: true }, { new: true });
        res.status(200).json({ message: 'Business deleted successfully', business: deletedBusiness });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting business', error });
    }
};

