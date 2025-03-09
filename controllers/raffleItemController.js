const { checkIfExists } = require("../utils/modelUtils");
const RafflePartner = require("../models/rafflePartner");
const RaffleItem = require("../models/raffleItem");

const createRaffleItem = async (req, res) => {
  const { item, description, quantity, logo, resourceLink, rafflePartner } =
    req.body;
  try {
    if (!(await checkIfExists(RafflePartner, rafflePartner))) {
      return res.status(404).json({ message: "Raffle Partner not Found" });
    }

    const raffleItem = new RaffleItem({
      raffle_partner: rafflePartner,
      name: item,
      description: description,
      image_src: logo,
      stock: quantity,
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
    const updatedRaffleItem = await RaffleItem.findByIdAndUpdate(
      id,
      {
        raffle_partner: rafflePartner,
        name: item,
        description: description,
        image_src: logo,
        stock: quantity,
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

module.exports = { createRaffleItem, updateRaffleItem, deleteRaffleItem };
