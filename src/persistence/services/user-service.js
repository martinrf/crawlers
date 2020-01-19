const UserModel = require('../models/user');

class UserService {

  async create(userProfile) {
    try {
      let model = new UserModel(userProfile);
      return await model.save();
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async updateOne(conditions, update, options = { multi: false }) {
    try {
      const response = await UserModel.updateOne(conditions, update, options);
      return response;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async findByFacebookId(facebook_id) {
    try {
      const user = await UserModel.findOne({ 'facebook_id': facebook_id });
      return user;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const user = await UserModel.findOne({ '_id': id });
      return user;
    } catch (error) {
      // TODO: Implement logger
      console.error(error);
      throw error;
    }
  }
}

module.exports = new UserService();
