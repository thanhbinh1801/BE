import UserModels from "../models/user_models.js";
import AuthService from "../services/auth_service.js";
import {OK, CREATED} from "../handler/success.reponse.js";
import {NotFoundError, ConflictRequestError, AuthFailureError, BadRequestError} from "../handler/error.reponse.js";
export default class AuthControllers{
    static async Login(req, res ){
      try{
        const data = {
          username: req.body.username,
          password : req.body.password
        }
        const token = await AuthService.LoginService(data);
        res.cookie('refreshToken', token.refreshToken, {
          httpOnly: true, 
          maxAge: 30*24*60*60*1000
        });
        new OK ({
          message: "Login successfully!",
          metadata: { accessToken: token.accessToken}
        }).send(res);
      }
      catch(error){
        next(error);
      }
        
    }

    static async Register(req, res) {
      try{
        const data ={
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          email : req.body.email,
          phone: req.body.phone
        }
        const user = await AuthService.RegisterService(data);
        if(!user){
          throw new ConflictRequestError("User is exist");
        }
        new CREATED({
          message: "Register successfully"
        }).send(res);
      }
      catch(error){
        next(error);
      }
    }

    static async processNewToken(req, res){ 
      try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
          throw new AuthFailureError("refresh token is not exist");
        }
        const token = await AuthService.processNewToken(refreshToken);
        res.cookie('refreshToken', token.refreshToken, {
          httpOnly: true, 
          maxAge: 30*24*60*60*1000
        });
        new OK ({
          message: "refresh token successfully",
          metadata: {accessToken: token.accessToken}
        }).send(res);
      }
      catch(error){
        next(error);
      }
    }

  static Logout(req, res) {
    //check accessToken
    
    res.clearCookie('refreshToken', {
      httpOnly: true
    });
    return res.status(200).json({msg: "logout successfully"});
  }

  static async  getUserByToken(req, res){
    const id = req.user.id;
    const user = await AuthService.getUserByToken(id);
    if(!user){
      throw new AuthFailureError ("error to get refresh token in cookie");
    }
    new OK({
      message: "get user successfully",
      metadata: { user: user}
    }).send(res);
  }
}