const SuperAdmin = require("../models/superAdmin");
const AdminBusiness = require("../models/business");
const Player = require("../models/playerUser");
const { checkIfExists } = require("../utils/modelUtils");
const RafflePartner = require("../models/rafflePartner");
const RaffleItem = require("../models/raffleItem");

const getBusinesses = async (req, res) => {
  //tested
  try {
    const businesses = await AdminBusiness.find();
    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: "No Businesses Found" });
    }
    res.status(200).json(businesses);
  } catch (error) {
    return res.status(500).json({ message: "Error Fetching Business", error });
  }
};

const manageCoins = async (req, res) => {
  const { id, newCoins } = req.params.id;
  try {
    if (await checkIfExists(Player, id)) {
      return res.status(404).json({ message: "Player not found!" });
    }
    const updatedCoins = await Player.findByIdAndUpdate(id, {
      coins: newCoins,
    });
    res.status(200).json({ message: updatedCoins });
  } catch (error) {
    return res.status(500).json({ message: "Error Updating Tokens", error });
  }
};

const createRaffleItem = async (req, res) => {
  const { item, description, quantity, logo, resourceLink, rafflePartner } =
    req.body;
  try {
    if (!(await checkIfExists(RaffleItem, item))) {
      return res.status(400).json({ message: "Raffle Item Already Exists" });
    }
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
    return res.status(500).json({ message: "Error Fetching Business", error });
  }
};

// async () => {
//     try {
//     } catch (error) {
//       return res.status(500).json({ message: "Error Fetching Business", error });
//     }
//   };

module.exports = { getBusinesses, manageCoins, createRaffleItem };
