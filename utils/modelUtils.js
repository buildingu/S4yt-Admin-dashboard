const checkIfExists = async (model, id) => {
    return await model.findOne({ _id: id, deleted: false });
  };
  
  module.exports = {
    checkIfExists,
  };