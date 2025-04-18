const Player = require("../models/playerUser");
const AdminBusiness = require("../models/adminbusiness");
const Business = require("../models/business");
const mongoose = require("mongoose");
const Answer = require("../models/answers");

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
  const banned_until = new Date(Date.now() + Number(duration));
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
      let banned_until_time;
      if (user.banned_until <= Date.now()) {
        banned_until_time = null;
      } else {
        banned_until_time = user.banned_until;
      }
      let filteredUser = {
        _id: user._id,
        name: user.name,
        banned_until: banned_until_time,
        email: user.email,
        coins: user.coins,
        attend_meeting: user.attend_meeting,
        kicked: user.kicked,
      };
      filteredUsers.push(filteredUser);
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    return res.status(500).json({ message: "Error Fetching Users", error });
  }
};

const getWinners = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await checkIfExists(AdminBusiness, businessId);
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found or already deleted" });
    }

    const winnerUserAwards = business.winners.map((winner) => ({
      user: winner.user.toString(),
      award: winner.award,
    }));

    const winnersAnswers = await Answer.find({
      user: { $in: winnerUserAwards.map((w) => w.user) },
    }).select("submission_link user rating");

    const winnersData = winnersAnswers.map((answer) => {
      const winner = winnerUserAwards.find(
        (winner) => winner.user === answer.user.toString()
      );
      return {
        submission_link: answer.submission_link,
        user: answer.user,
        award: winner.award,
        rating: answer.rating,
      };
    });

    res.status(200).json(winnersData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Winners from Users", error });
  }
};

const saveWinners = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { winners } = req.body;
    if (winners.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid winners array" });
    }
    if (!(await checkIfExists(AdminBusiness, businessId)))
      return res
        .status(404)
        .json({ message: "Business not found or already deleted" });

    const formattedWinners = winners.map((winner) => ({
      user: new mongoose.Types.ObjectId(winner.user),
      award: winner.award,
    }));

    const updatedAdminBusiness = await AdminBusiness.findByIdAndUpdate(
      businessId,
      {
        $addToSet: {
          winners: { $each: formattedWinners },
        },
      },
      { new: true }
    );

    const formatted2Winners = winners.map((winner) => ({
      user_id: new mongoose.Types.ObjectId(winner.user),
      award: winner.award,
    }));
    const business = await Business.findOne({
      admin_business_id: new mongoose.Types.ObjectId(businessId),
    });
    console.log(business);
    await Business.findByIdAndUpdate(business._id, {
      $addToSet: {
        winners: { $each: formatted2Winners },
      },
    });

    res.status(200).json(updatedAdminBusiness);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving Winners from Users", error });
  }
};

const deleteWinners = async (req, res) => {
  try {
    const { businessId, userId } = req.params;

    const adminbusiness = await checkIfExists(AdminBusiness, businessId);
    if (!adminbusiness) {
      return res
        .status(404)
        .json({ message: "Business not found or already deleted" });
    }
    const winnerIndex = adminbusiness.winners.findIndex(
      (winner) => winner.user.toString() === userId
    );
    if (winnerIndex === -1) {
      return res
        .status(404)
        .json({ message: "User not found in the winners list" });
    }
    await AdminBusiness.updateOne(
      { _id: businessId },
      { $pull: { winners: { user: userId } } }
    );
    const business = await Business.findOne({
      admin_business_id: new mongoose.Types.ObjectId(businessId),
    });
    await Business.updateOne(
      { _id: business._id },
      { $pull: { winners: { user_id: userId } } }
    );
    res.status(200).json({ message: "Winner successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting winner", error });
  }
};

module.exports = {
  manageCoins,
  kickUser,
  banUser,
  getUsers,
  getWinners,
  saveWinners,
  deleteWinners,
};
