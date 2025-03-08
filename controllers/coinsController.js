const Player = require("../models/playerUser");

const { checkIfExists } = require("../utils/modelUtils");
const manageCoins = async (req, res) => {
  const { id } = req.params.id;
  const { newCoins } = req.body;
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

module.exports = { manageCoins };
