import writeFileSync from "../utils/WriteFileSync.js";
import dbjson from '../db/db.json' with {type: "json"};

class UserModels{

  static getAllUser = async () => {
    return dbjson.users;
  }
  
  static getUserbyID = async (id) => {
    const data = dbjson.users.find(user => user.id == parseInt(id) );
    if (!data) {
      return null;
    }
    return data;
  }
  
  static addUser = async (user) => {
    try{
      const newUser = {
        id: dbjson.users.reduce((max, item) => item.id > max ? item.id : max, dbjson.users[0].id) + 1,
        ...user
      }
      dbjson.users.push(newUser);
      writeFileSync(dbjson);
    }
    catch(error){
      return null;
    }
    return newUser;
  }
  
  static putUser = async (user, id) => {
    try{
      const user_index = dbjson.users.findIndex(dbUser => parseInt(dbUser.id) === parseInt(id));
      if(user_index == -1) {
        return null;
      }
      dbjson.users[user_index] = {
        id: dbjson.users[user_index].id,
        ...user
      }
      writeFileSync(dbjson);
      return dbjson.users[user_index];
    }
    catch(error){
      return null;
    }
  }
  
  static deleteUser = async (id) => {
    try{
      const user_index = dbjson.users.findIndex( user =>parseInt(user.id) === parseInt(id));
      if(user_index == -1) {
        return null;
      }
      const deleteUser = dbjson.users.splice(user_index, 1);
      writeFileSync(dbjson);
      return deleteUser;
    }
    catch(error){
      return null;
    }
  }
}
  
export default  UserModels;
