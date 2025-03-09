import UserMySQL from "../models/UserMySQL.js";


class UserRepository {
  async findByUsername(username) {
    return await UserMySQL.findOne({ where: { username } });
  }

  async createUser(userData) {
    return await UserMySQL.create(userData);
  }
}

export default new UserRepository();
