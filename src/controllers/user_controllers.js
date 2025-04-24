import UserService from '../services/user_service.js';

class UserControllers{
  static getAllUser = async (req, res) => {
    try {
        const users = await UserService.getAllUser();
        console.log(users);
        if(!users){
          return res.status(404).json({message : "User not found"});
        }
        res.status(200).json(users);
    } catch(error) {
      res.status(500).json({ message: "Fail to get all user" });
    }
  }

  static getUserByID = async (req, res) => {
    try{
      const id = req.params.id;
      const user = await UserService.getUserById(id);
      if(!user){
        return res.status(404).json({message: "User not found!"});
      }
      res.status(200).json(user);
    }
    catch(error){
      res.status(500).json({message: "Fail to get user by ID"});
    }
  }

  static addUser = async (req, res) => {
    try{
      const user = req.body;
      const newUser = await UserService.addUser(user);
      res.status(201).json({message : "Add user successfully!", user: newUser});
    }
    catch(error){
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static putUser = async (req, res) => {
    try{
      const id = req.params.id;
      const user = req.body;
      const updateUser = await UserService.putUser(id, user);
      if(!updateUser) {
        return res.status(404).json({message: "User not found!"});
      }
      res.status(200).json({message : "Put user successfully! ", user : updateUser});
    }
    catch(error){
      res.status(500).json({ message : "Internal Server Error"});
    }
  }

  static deleteUser = async (req, res) => {
    try{
      const id = req.params.id;
      console.log(id);
      const deleteUser = await UserService.deleteUser(id);

      if(!deleteUser){
        return res.status(404).json({ message :" User not found !"});
      }
      res.status(200).json({message: "User has been defeat"})
    }
    catch(error){
      res.status(500).json({ message : "Internal Server Error"});
    }
  }
}

export default UserControllers;