import writeFileSync from "../utils/WriteFileSync.js";
import dbjson from '../db/db.json' with {type: "json"};

const getAllUser = async () => {
  return dbjson.users;
}

const getUserbyID = async (id) => {
  const data = dbjson.users.find(user => user.id == parseInt(id) );
  if (!data) {
    return null;
  }
  return data;
}

const addUser = async (user) => {
  const newUser = {
    id: dbjson.users.reduce((max, item) => item.id > max ? item.id : max, dbjson.users[0].id) + 1,
    ...user
  }
  dbjson.users.push(newUser);
  writeFileSync(dbjson);
  return newUser;
}

const putUser = async (user, id) => {
  const user_index = dbjson.users.findIndex( user => user.id === parseInt(id));
  if(user_index == -1) {
    return null;
  }
  dbjson.users[user_index] = {
    id: dbjson.users.reduce((max, item) => item.id > max ? item.id : max, dbjson.users[0].id) + 1,
    ...user
  }
  writeFileSync(dbjson);
  return dbjson.users[user_index];
}

const deleteUser = async (id) => {
  const user_index = dbjson.users.findIndex( user => user.id === parseInt(id));
  if(user_index == -1) {
    return null;
  }
  const deleteUser = dbjson.users.splice(user_index, 1);
  writeFileSync(dbjson);
  return deleteUser[0];
}

export default  {
  getAllUser,
  getUserbyID,
  addUser,
  putUser,
  deleteUser
}
