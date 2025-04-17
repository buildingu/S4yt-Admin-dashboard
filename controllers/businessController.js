const AdminBusiness = require('../models/adminbusiness');
const Business = require('../models/business');
const { checkIfExists } = require('../utils/modelUtils');
const cloudinary = require('cloudinary').v2;


exports.getBusinesses = async (req, res) => {
    try {
        const business = await AdminBusiness.find({ deleted: false });
        if (!business) return res.status(404).json({ message: 'Businesses not found' });

        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching businesses', error });
    }
};


exports.getBusinessById = async (req, res) => {
    const id = req.params.id;
    try {

        const business = await checkIfExists(AdminBusiness, id);
        if (!business) {
            return res.status(404).json({ message: "Business not found or already deleted" });
        }
        return res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching business', error });
    }
};


exports.updateBusiness = async (req, res) => {
    const id = req.params.id;
    const { name, description, title, question, youtubeLink, award_limit, attendance_confirm } = req.body;
    const logo = req.files?.logo;

    try {
        const businessExists = await checkIfExists(AdminBusiness, id);
        if (!businessExists) {
            return res.status(404).json({ message: 'Business not found or already deleted' });
        }

        let logoUrl = null;

        if (logo) {
            if (businessExists.logo) {
                const logoUrlParts = businessExists.logo.split('/');
                const publicIdWithExt = logoUrlParts.slice(-1)[0]; 
                const folder = logoUrlParts[logoUrlParts.length - 2]; 
                const publicId = `${folder}/${publicIdWithExt.split('.')[0]}`;

                try {
                    await cloudinary.uploader.destroy(publicId);
                    console.log(`Deleted previous logo: ${publicId}`);
                } catch (err) {
                    console.warn(`Failed to delete previous logo from Cloudinary:`, err);
                }
            }

            const dataUri = `data:${logo.mimetype};base64,${logo.data.toString('base64')}`;
            const uploadResult = await cloudinary.uploader.upload(dataUri, {
                folder: 'business_logos',
                resource_type: 'auto',
            });
            logoUrl = uploadResult.secure_url;
        }

        const updateFields = {
            ...(name && { business_name: name }),
            ...(description && { description }),
            ...(logoUrl && { logo: logoUrl }),
            ...(question && { question_main: question }),
            ...(title && { title }),
            ...(youtubeLink && { video_url: youtubeLink }),
            ...(award_limit !== undefined && { award_limit }),
            ...(attendance_confirm !== undefined && { attendance_confirm })
        };

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        const updatedAdminBusiness = await AdminBusiness.findByIdAndUpdate(id, updateFields, { new: true });

        const businessUpdateFields = {
            ...(name && { name }),
            ...(description && { description }),
            ...(logoUrl && { logo: logoUrl }),
            ...(youtubeLink && { video_url: youtubeLink }),
            ...(award_limit !== undefined && { award_limit }),
            ...(question && { question_main: question }),
            // ...(video_title && { video_title: video_title }), this doesn't exist on the admin panel 
        };

        await Business.findOneAndUpdate(
            { admin_business_id: id },
            businessUpdateFields,
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json(updatedAdminBusiness);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error updating business', error });
    }
};



exports.deleteBusiness = async (req, res) => {
    const id = req.params.id;
    try {
        if (!(await checkIfExists(AdminBusiness, id)))
            return res.status(404).json({ message: 'Business not found or already deleted' });
        const deletedAdminBusiness = await AdminBusiness.findByIdAndUpdate(id, { deleted: true }, { new: true });
        await Business.findOneAndUpdate( { admin_business_id: id }, { deleted: true });

        res.status(200).json({ message: 'Business deleted successfully', business: deletedAdminBusiness });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting business', error });
    }
};

