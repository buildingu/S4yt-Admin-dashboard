const express = require("express");
const router = express.Router();
const {
  manageCoins,
  kickUser,
  banUser,
  getUsers,
} = require("../controllers/playerController");
const {
  createRaffleItem,
  updateRaffleItem,
  deleteRaffleItem,
  getRaffleItems,
} = require("../controllers/raffleItemController");
const {
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");
const { getBusinesses } = require("../controllers/superAdminController");
const {
  createRafflePartner,
  updateRafflePartner,
  deleteRafflePartner,
  getRafflePartners,
} = require("../controllers/rafflePartnerController");

router.get("/admin/businesses", getBusinesses);
router.put("/business/:id", updateBusiness);
router.delete("/business/:id", deleteBusiness);

router.get("/raffle-items", getRaffleItems);//
router.post("/raffle-item", createRaffleItem);
router.put("/raffle-item/:id", updateRaffleItem);
router.delete("/raffle-item/:id", deleteRaffleItem);

router.get("/raffle-partners", getRafflePartners);//
router.post("/raffle-partner", createRafflePartner);//
router.put("/raffle-partner/:id", updateRafflePartner);//
router.delete("/raffle-partner/:id", deleteRafflePartner);//

router.get("/users", getUsers); 
router.put("/manage-coins/:id", manageCoins);
router.put("/kick-user/:id", kickUser);
router.put("/ban-user/:id", banUser); //duration in ms - need to convert on the frontend

module.exports = router;
