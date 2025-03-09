const express = require("express");
const router = express.Router();
const { manageCoins, kickUser } = require("../controllers/playerController");
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

router.post("/raffleItem", createRaffleItem);
router.put("/raffleItem/:id", updateRaffleItem);
router.delete("/raffleItem/:id", deleteRaffleItem);

router.put("/manageCoins/:id", manageCoins);
router.put("kickUser/:id", kickUser);
router.put("/banUser/:id", banUser);

module.exports = router;
