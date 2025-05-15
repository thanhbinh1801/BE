import UserModels from "../models/user_models.js";
import HashService from "../utils/HashService.js";
import CreateToken from "../utils/CreateToken.js";
import {NotFoundError, ConflictRequestError, AuthFailureError, BadRequestError} from "../handler/error.reponse.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const secret_key = process.env.JWT_secret_key;

export default class AuthService{
  static async LoginService(data){
    const user = await UserModels.findOne({username: data.username});
    if(!user){
      throw new NotFoundError("User not found");
    }
    if(!HashService.verifyPW(data.password, user.password)){
      throw new BadRequestError("password is not compare")
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

  static async processNewToken(token){
    const payload = jwt.verify(token, secret_key);
    const {id, username} = payload;
    const accessToken = CreateToken.genAccessToken({id, username});
    const refreshToken = CreateToken.genRefreshToken({id, username});
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