const checkIfExists = async (model, id) => {
    return await model.findOne({ _id: id, deleted: { $ne: true }});
  };
  
  module.exports = {
    checkIfExists,
  };