const { checkIfExists } = require("../utils/modelUtils");
const RafflePartner = require("../models/rafflePartner");
const cloudinary = require('cloudinary').v2;

const createRafflePartner = async (req, res) => {
  const { organization_name, resource_link, resource_category } = req.body;
  const logo = req.files?.logo;
  const resourceLogo = req.files?.resourceLogo;
  let logoUrl = null;
  let resourceLogoUrl = null;

  if (logo) {
    const dataUri = `data:${logo.mimetype};base64,${logo.data.toString(
      "base64"
    )}`;
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "business_logos",
      resource_type: "auto",
    });
    logoUrl = uploadResult.secure_url;
  }

  if (resourceLogo) {
    const dataUri = `data:${resourceLogo.mimetype};base64,${resourceLogo.data.toString("base64")}`;
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "resource_logos",
      resource_type: "auto",
    });
    resourceLogoUrl = uploadResult.secure_url;
  }

  try {
    const rafflePartner = new RafflePartner({
      logo: logoUrl,
      organization_name: organization_name,
      resource_link: resource_link,
      resource_category: resource_category,
      resource_logo: resourceLogoUrl,
    });
    await rafflePartner.save();
    res.status(200).json("New Raffle Partner Created!");
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error Adding Partner", error });
  }
};

const updateRafflePartner = async (req, res) => {
  const id = req.params.id;

  try {
    const partnerExists = await checkIfExists(RafflePartner, id);
    if (!partnerExists) {
      return res.status(404).json({ message: 'Business not found or already deleted' });
    }
    const { organization_name, resource_link, resource_category } = req.body;
    const logo = req.files?.logo;
    const resourceLogo = req.files?.resourceLogo;
    let logoUrl = null;
    let resourceLogoUrl = null;


    if (logo) {
      if (partnerExists.logo) {
        const logoUrlParts = partnerExists.logo.split("/");
        const publicIdWithExt = logoUrlParts.slice(-1)[0];
        const folder = logoUrlParts[logoUrlParts.length - 2];
        const publicId = `${folder}/${publicIdWithExt.split(".")[0]}`;

        try {
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted previous logo: ${publicId}`);
        } catch (err) {
          console.warn(`Failed to delete previous logo from Cloudinary:`, err);
        }
      }

      const dataUri = `data:${logo.mimetype};base64,${logo.data.toString(
        "base64"
      )}`;
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "business_logos",
        resource_type: "auto",
      });
      logoUrl = uploadResult.secure_url;
    }
    if (resourceLogo) {
      if (partnerExists.resourceLogo) {
        const resourceLogoUrlParts = partnerExists.resourceLogo.split("/");
        const publicIdWithExt = resourceLogoUrlParts.slice(-1)[0];
        const folder = resourceLogoUrlParts[resourceLogoUrlParts.length - 2];
        const publicId = `${folder}/${publicIdWithExt.split(".")[0]}`;

        try {
          await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted previous resource logo: ${publicId}`);
        } catch (err) {
          console.warn(
            `Failed to delete previous resource logo from Cloudinary:`,
            err
          );
        }
      }

      const dataUri = `data:${resourceLogo.mimetype
        };base64,${resourceLogo.data.toString("base64")}`;
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "resource_logos",
        resource_type: "auto",
      });
      resourceLogoUrl = uploadResult.secure_url;
    }
    const updatedRafflePartner = await RafflePartner.findByIdAndUpdate(
      id,
      {
        logo: logoUrl,
        organization_name: organization_name,
        resource_link: resource_link,
        resource_category: resource_category,
        resource_logo: resourceLogoUrl,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Updated Successfully!", updatedRafflePartner });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error Updating Partner", error });
  }
};

const deleteRafflePartner = async (req, res) => {
  const id = req.params.id;
  try {
    if (!(await checkIfExists(RafflePartner, id))) {
      return res.status(404).json("Partner Does Not Exist!");
    }
    await RafflePartner.deleteOne({ _id: id });
    res.status(200).json("Partner Deleted!");
  } catch (error) {
    return res.status(500).json({ message: "Error Deleting Partner", error });
  }
};

const getRafflePartners = async (req, res) => {
  try {
    const partners = await RafflePartner.find({ deleted: false });
    if (!partners || partners.length === 0) {
      return res.status(404).json({ message: "Partners not found" });
    }
    res.status(200).json({ message: "Raffle Partners Found!", partners });
  } catch (error) {
    return res.status(500).json({ message: "Error Getting Partners", error });
  }
};

module.exports = {
  createRafflePartner,
  updateRafflePartner,
  deleteRafflePartner,
  getRafflePartners,
};
