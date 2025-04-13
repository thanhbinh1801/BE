import userModels from '../models/user_models.js'

class UserControllers{

    static getAllUser = async (req, res) => {
      try {
          const users = await userModels.getAllUser();
          res.status(200).render('index', { users });
      } catch(error) {
        res.status(500).json({ message: "Fail to get user" });
      }
  }

  static showAddForm = (req, res) => {
      res.render('form', { 
          title: 'Add New User',
          actionUrl: '/add',
          user: null 
      });
  }

  static showEditForm = async (req, res) => {
      try {
          const id = req.params.id;
          const user = await userModels.getUserbyID(id);
          if(!user) {
              return res.status(404).json({ message: "User not found!" });
          }
          res.render('form', { 
              title: 'Edit User',
              actionUrl: `/edit/${id}?_method=PUT`,
              user 
          });
      } catch(error) {
          res.status(500).json({ message: "Fail to get user" });
      }
  }

  static getUserByID = async (req, res) => {
    try{
      const id = req.params.id;
      const user = await userModels.getUserbyID(id);
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
      const newUser = userModels.addUser(user);
      res.status(201).redirect('/');
    }
    catch(error){
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static putUser = async (req, res) => {
    try{
      const id = req.params.id;
      const user = req.body;
      const updateUser = await userModels.putUser(user, id);
      if(!updateUser) {
        return res.status(404).json({message: "User not found!"});
      }
      res.redirect('/');
    }
    catch(error){
      res.status(500).json({ message : "Internal Server Error"});
    }
  }

  static deleteUser = async (req, res) => {
    try{
      const id = req.params.id;
      const deleteUser = await userModels.deleteUser(id);

      if(!deleteUser){
        return res.status(404).json({ message :" User not found !"});
      }
      res.redirect('/');
    }
    catch(error){
      res.status(500).json({ message : "Internal Server Error"});
    }
  }
}

export default UserControllers;