const Business = require('../models/business');
const { checkIfExists } = require('../utils/modelUtils');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

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
    const { name, description,  title, question, youtubeLink, award_limit, attendance_confirm } = req.body;
    const logo = req.file;
    
    try {
        const businessExists = await checkIfExists(Business, id);
        if (!businessExists) {
            return res.status(404).json({ message: 'Business not found or already deleted' });
        }

        let logoUrl = null;
        if (logo) {
            const cloudinaryUploadResult = await cloudinary.uploader.upload(logo, {
                folder: 'business_logos',
                resource_type: 'auto',   
            });
            logoUrl = cloudinaryUploadResult.secure_url; 
        }

        const updateFields = {
            ...(name && { name }),
            ...(description && { description }),
            ...(logoUrl  && { logo: logoUrl  }),
            ...(question && { question_main: question }),
            ...(title && { title }),
            ...(youtubeLink && { youtube_link: youtubeLink }),
            ...(award_limit !== undefined && { award_limit: award_limit }),
            ...(attendance_confirm !== undefined && { attendance_confirm: attendance_confirm })
        };

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        const updatedBusiness = await Business.findByIdAndUpdate(id, updateFields, { new: true });
        console.log(logoUrl);

        res.status(200).json(updatedBusiness);
    } catch (error) {
        console.log(error)
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

