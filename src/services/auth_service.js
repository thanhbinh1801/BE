import UserModels from "../models/user_models.js";
import HashService from "../utils/HashService.js";
import CreateToken from "../utils/CreateToken.js";

export default class AuthService{
  static async LoginService(data){
    const user = await UserModels.findOne({username: data.username});
    if(!user){
      return null;
    }
    if(!HashService.verifyPW(data.password, user.password)){
      return null;
    }
    const accessToken = CreateToken.genAccessToken(user);
    const refreshToken = CreateToken.genRefreshToken(user);
    return { accessToken, refreshToken };
  }

  static async RegisterService(data){
    const userExist = await UserModels.findOne({username : data.username});
    if(userExist){
      return null;
    } 
    const hashedPW = HashService.hashPW(data.password);
    const newUser = new UserModels({
      username : data.username,
      password: hashedPW,
      name: data.name,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone: data.phone
    });
    await newUser.save();
    const returnUser = await UserModels.findOne({_id: newUser.id}).select("-password");
    return returnUser;
  }

  static async processNewToken(data){
    const accessToken = CreateToken.genAccessToken(data);
    const refreshToken = CreateToken.genRefreshToken(data);
    return { accessToken, refreshToken };
  }
  static async getUserByToken(id){
    const user = await UserModels.findById(id).select("-password");
    if(!user){
      return null;
    }
    return user;
  }
}