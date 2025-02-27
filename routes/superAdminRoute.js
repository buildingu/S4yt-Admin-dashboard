const express = require("express");
const router = express.Router();

const {
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");
const {
  getBusinesses,
  manageCoins,
  createRaffleItem,
} = require("../controllers/superAdminController");

router.get("/admin/businesses", getBusinesses);

// router.post("/business", createBusiness);
router.put("/business/:id", updateBusiness);
router.delete("/business/:id", deleteBusiness);

router.post("/raffleItem", createRaffleItem);
// router.delete("/raffleitem", deleteRaffleItem);

router.put("/manageCoins/:id/:newCoins", manageCoins);

module.exports = router;
