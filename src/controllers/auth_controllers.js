import UserModels from "../models/user_models.js";
import AuthService from "../services/auth_service.js";

export default class AuthControllers{
    static async Login(req, res ){
      try{
        const data = {
          username: req.body.username,
          password : req.body.password
        }
        const token = await AuthService.LoginService(data);
        console.log(token+ " hahah");
        if(!token){
          return res.status(404).json({message : "User not found"});
        } 
        res.cookie('refreshToken', token.refreshToken, {
          httpOnly: true, 
          maxAge: 30*24*60*60*1000
        });
        res.status(200).json({ "data": { "accessToken": token.accessToken}, "message": "Login successfully!"});
      }
      catch{
        res.status(500).json({message : "Fail to login"});
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
        return res.status(400).json({message : "User is exist"});
      }
      res.status(201).json({message : "Register successfully"});
    }
    catch(err){
      console.error(err);
      res.status(500).json({ message: "Fail to register", error: err.message });
    }
  }
  static async processNewToken(req, res){
    const data = req.user;
    const token = await AuthService.processNewToken(data);
    if(!token){
      return res.status(200).json({msg: "Fail to refresh"});
    }
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true, 
      maxAge: 30*24*60*60*1000
    });
    res.status(200).json({ "accessToken": token.accessToken});
  }
  static Logout(req, res) {
    res.clearCookie('refreshToken', {
      httpOnly: true
    });
    return res.status(200).json({msg: "logout successfully"});
  }
  static async  GetUserByToken(req, res){
    const id = req.user.id;
    const user = await AuthService.getUserByToken(id);
    if(!user){
      return res.status(401).json({msg: "error to get refresh token in cookie"});
    }
    return res.status(200).json({
      data: { user }
    })
  }
}