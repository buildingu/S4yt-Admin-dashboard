const Player = require("../models/playerUser");

const { checkIfExists } = require("../utils/modelUtils");
const manageCoins = async (req, res) => {
  const id = req.params.id;
  const { newCoins } = req.body;
  try {
    if (await checkIfExists(Player, id)) {
      return res.status(404).json({ message: "Player not found!" });
    }
    const updatedCoins = await Player.findByIdAndUpdate(id, {
      coins: newCoins,
    });
    res.status(200).json(`Coins Updated To ${newCoins} Successfully!`);
  } catch (error) {
    return res.status(500).json({ message: "Error Updating Tokens", error });
  }
};
const kickUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Player.findByIdAndUpdate(id, { kicked: true });
    if (!user) {
      return res.status(404).json("User Not Found!");
    }
    res.status(200).json("User Kicked Successfully!");
  } catch (error) {
    return res.status(500).json({ message: "Error!", error });
  }
};
const banUser = async (req, res) => {
  const id = req.params.id;
  const { duration } = req.body;
  const banned_until = new Date(Date.now() + duration);
  try {
    const user = await Player.findByIdAndUpdate(id, {
      banned_until: banned_until,
    });
    if (!user) {
      return res.status(404).json("User Not Found!");
    }
    res.status(200).json(`User Banned Successfully Until ${banned_until}!`);
  } catch (error) {
    return res.status(500).json({ message: "Error!", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Player.find({ role: "Player" });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    let filteredUsers = [];
    users.forEach((user) => {
      let filteredUser = {
        _id: user._id,
        name: user.name,
        banned_until: user.banned_until,
        email: user.email,
        coins: user.coins,
      };
      filteredUsers.push(filteredUser);
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    return res.status(500).json({ message: "Error Fetching Users", error });
  }
};

module.exports = { manageCoins, kickUser, banUser, getUsers };
