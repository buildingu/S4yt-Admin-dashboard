const AdminBusiness = require("../models/adminbusiness");
const { checkIfExists } = require("../utils/modelUtils");
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
const deleteBusiness = async(req, res)=>{
  try{
    const id = req.params.id
    if(!(await checkIfExists(AdminBusiness, id))){
      return res.status(404).json({message:"Business not found!"})
    }
    await AdminBusiness.deleteOne({business_user_id: id})
    res.status(200).json({message:"Business successfully deleted"})
  }catch(error){
    return res.status(500).json({message:"Error!", error})
  }
}

module.exports = { getBusinesses, deleteBusiness };
