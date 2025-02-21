const express = require("express");
const router = express.Router();

const {
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");

// router.post("/business", createBusiness);
router.put("/business/:id", updateBusiness);
router.delete("/business/:id", deleteBusiness);

router.post("/raffleItem", createRaffleItem);
router.delete("/raffleitem", deleteRaffleItem);

router.put("/manageTokens/:id", manageTokens);

module.exports = router;
