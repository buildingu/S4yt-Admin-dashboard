const { checkIfExists } = require("../utils/modelUtils");
const RafflePartner = require("../models/rafflePartner");

const createRafflePartner = async (req, res) => {
  const { organization_name, resource_link, resource_category, logo } =
    req.body;
  try {
    const rafflePartner = new RafflePartner({
      logo: logo,
      organization_name: organization_name,
      resource_link: resource_link,
      resource_category: resource_category,
    });
    await rafflePartner.save();
    res.status(200).json("New Raffle Partner Created!");
  } catch (error) {
    return res.status(500).json({ message: "Error Adding Partner", error });
  }
};

const updateRafflePartner = async (req, res) => {
  const id = req.params.id;
  try {
    if (!(await checkIfExists(RafflePartner, id))) {
      return res.status(404).json("Partner Does Not Exist!");
    }
    const { organization_name, resource_link, resource_category, logo } =
      req.body;
    const updatedRafflePartner = await RafflePartner.findByIdAndUpdate(
      id,
      {
        logo: logo,
        organization_name: organization_name,
        resource_link: resource_link,
        resource_category: resource_category,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Updated Successfully!", updatedRafflePartner });
  } catch (error) {
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
