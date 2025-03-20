const { checkIfExists } = require("../utils/modelUtils");
const RafflePartner = require("../models/rafflePartner");
const RaffleItem = require("../models/raffleItem");

const createRaffleItem = async (req, res) => {
  const { item, description, quantity, logo, resourceLink, rafflePartner } =
    req.body;
  try {
    const associatedRafflePartner = await RafflePartner.findOne({
      organization_name: rafflePartner,
    });

    const raffleItem = new RaffleItem({
      raffle_partner: associatedRafflePartner._id,
      raffle_partner_name: rafflePartner,
      name: item,
      description: description,
      image_src: logo,
      stock: quantity,
      resource_link: resourceLink,
    });
    await raffleItem.save();
    res.status(200).json("New Raffle Item Created!");
  } catch (error) {
    return res.status(500).json({ message: "Error Adding Item", error });
  }
};

const updateRaffleItem = async (req, res) => {
  const id = req.params.id;
  try {
    if (!(await checkIfExists(RaffleItem, id))) {
      return res.status(404).json("Item Does Not Exist!");
    }
    const { item, description, quantity, logo, resourceLink, rafflePartner } =
      req.body;
    const associatedRafflePartner = await RafflePartner.findOne({
      organization_name: rafflePartner,
    });

    const updatedRaffleItem = await RaffleItem.findByIdAndUpdate(
      id,
      {
        raffle_partner: associatedRafflePartner._id,
        raffle_partner_name: rafflePartner,
        name: item,
        description: description,
        image_src: logo,
        stock: quantity,
        resource_link: resourceLink,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Updated Successfully!", updatedRaffleItem });
  } catch (error) {
    return res.status(500).json({ message: "Error Updating Item", error });
  }
};

const deleteRaffleItem = async (req, res) => {
  const id = req.params.id;
  try {
    if (!(await checkIfExists(RaffleItem, id))) {
      return res.status(404).json("Item Does Not Exist!");
    }
    await RaffleItem.deleteOne({ _id: id });
    res.status(200).json("Item Deleted!");
  } catch (error) {
    return res.status(500).json({ message: "Error Deleting Item", error });
  }
};

const getRaffleItems = async (req, res) => {
  try {
    const items = await RaffleItem.find({ deleted: false });
    if (!items || items.length === 0) {
      return res.status(404).json({ message: "Items not found" });
    }
    res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Error Getting Items", error });
  }
};

module.exports = {
  createRaffleItem,
  updateRaffleItem,
  deleteRaffleItem,
  getRaffleItems,
};
