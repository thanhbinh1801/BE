import UserModels from "../models/user_models.js";

const regexEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3}$/ ;
const regexPhone = /^09[0-9]{9}/;

class Validate{
  static async userValidate ( req, res, next ){
    const user = req.body;
    let check = false;
    let errorArr = [];
  
    if(user.name.length < 10 || !user.name) {
      errorArr.push("Name is invalid");
      check = true;   
    }
  
    if( user.age <= 0  || user.age >= 100 || Number.isNaN(user.age)){
      errorArr.push("Age is invalid");
      check = true;
    }
  
    if(user.gender !== "male" && user.gender !== "female"){
      errorArr.push("Gender is invalid");
      check = true;
    }
  
    if (!regexEmail.test(user.email)) {
      check = true;
      errorArr.push("Email is invalid");
    } else {
      let emailExists;
      if( user.id != ""){
        emailExists = await UserModels.findOne({email : user.email});
      } else {
        emailExists = await UserModels.findOne({email: user.email, id: { $ne: user.id}});
      }
      if (emailExists) {
        errorArr.push("Email must be unique");
        check = true;
      }
    }
    
    if (!regexPhone.test(user.phone)) {
      errorArr.push("Phone is invalid");
      check = true;
    } else {
      let phoneExists;
      if( user.id != ""){
        phoneExists = await UserModels.findOne({phone : user.phone});
      } else {
        phoneExists = await UserModels.findOne({phone: user.phone, id: { $ne: user.id}});
      }
      if (phoneExists) {
        errorArr.push("Phone must be unique");
        check = true;
      }
    }
    
    if(check) {
      res.status(400).json({message: "Data is invalid",
        err: errorArr
      })
      return;
    }
    
    next();
  }
  static authValidate (req, res, next) {
    const user = req.body;
    let check = false;
    let errorArr = [];

    if(!user.username){
      errorArr.push("Username is required");
      check = true;
    }
    if(!user.password){
      errorArr.push("password is required");
      check = true;
    }
    if(check) {
      res.status(400).json({message: "Data is invalid",
        err: errorArr
      })
      return;
    }
    
    next();
  }
}

export default Validate;