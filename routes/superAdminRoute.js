const express = require("express");
const router = express.Router();
const {
  manageCoins,
  kickUser,
  banUser,
} = require("../controllers/playerController");
const {
  createRaffleItem,
  updateRaffleItem,
  deleteRaffleItem,
} = require("../controllers/raffleItemController");
const {
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");
const { getBusinesses } = require("../controllers/superAdminController");

router.get("/admin/businesses", getBusinesses);
router.put("/business/:id", updateBusiness);
router.delete("/business/:id", deleteBusiness);

router.post("/raffle-item", createRaffleItem);
router.put("/raffle-item/:id", updateRaffleItem);
router.delete("/raffle-item/:id", deleteRaffleItem);

router.put("/manage-coins/:id", manageCoins);
router.put("/kick-user/:id", kickUser);
router.put("/ban-user/:id", banUser); //duration in ms - need to convert on the frontend

module.exports = router;
