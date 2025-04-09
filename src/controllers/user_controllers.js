import userService from '../services/user_service.js'

const getAllUser = async (req, res) => {
  const user = await userService.getAllUser();
  if(!user){
    return res.status(404).json({message: "User not found!"});
  }
  res.status(200).json(user);
}

const getUserByID = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserbyID(id);
  if(!user){
    return res.status(404).json({message: "User not found!"});
  }
  res.status(200).json(user);
}

const addUser = async (req, res) => {
  try{
    const user = req.body;
    const newUser = userService.addUser(user);
    console.log(newUser);
    res.status(201).json(newUser);
  }
  catch(error){
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const putUser = async (req, res) => {
  try{
    const id = req.params.id;
    const user = req.body;
    const updateUser = await userService.putUser(user, id);
    if(!updateUser) {
      return res.status(404).json({message: "User not found!"});
    }
    res.status(200).json(updateUser);
  }
  catch(error){
    res.status(500).json({ message : "Internal Server Error"});
  }
}

const deleteUser = async (req, res) => {
  try{
    const id = req.params.id;
    const deleteUser = await userService.deleteUser(id);
    if(!deleteUser){
      return res.status(404).json({ message :" User not found !"});
    }
    res.status(200).send("User deleted successfully");
  }
  catch(error){
    res.status(500).json({ message : "Internal Server Error"});
  }
}

export default {
  getAllUser,
  getUserByID,
  addUser,
  putUser,
  deleteUser
}