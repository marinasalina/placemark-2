import { User } from "./user.js";

export const userMongoStore = {
  async findAll() {
    return User.find().lean();
  },

  async findById(id) {
    return User.findById(id).lean();
  },

  async findByEmail(email) {
    return User.findOne({ email }).lean();
  },

  async addUser(user) {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser.toObject();
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
