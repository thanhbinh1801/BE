import UserModels from "../models/user_models.js";

class UserService {
  static getAllUser = async () => {
    const user = await UserModels.find();
    return user;
  }
  static getUserById = async (id) => {
    const user = await UserModels.findById(id);
    return user;
  }
  static addUser = async (user) => {
    const newUser = new UserModels(user);
    const saveUser = await newUser.save();
    return saveUser;
  }
  static putUser = async (id, user) => {
    const putUser = await UserModels.findByIdAndUpdate(id, user);
    return putUser;
  }
  static deleteUser = async (id) =>{
   const user = await UserModels.findByIdAndDelete(id);
   console.log(user);
   return user; 
  }
}

export default UserService;