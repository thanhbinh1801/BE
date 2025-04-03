import { Router } from "express";
import fs from 'fs';
import path from "path";
import dbjson from '../db.json' with {type: "json"};
const router = Router();

router.get('/users', (req, res) => { 
  const users = dbjson.users;
  res.status(200).json(users);
})

router.get('/users/:id', (req, res) => {
  const id_user = req.params.id;
  const user = dbjson.users.find( user => user.id === parseInt(id_user));
  console.log(user);
  if(!user){
    res.status(404).send('User not found');
  }else{
    res.status(200).json(user);
  }
})

router.post('/users', (req, res) => {
  const { name, age} = req.body;
  const newUser = {
  id: dbjson.users.length + 1,
  name,
  age
  }
  dbjson.users.push(newUser);
  try{
  fs.writeFileSync(path.resolve('db.json'), JSON.stringify(dbjson,null,2));
  res.status(201).json(newUser);
  } 
  catch(error){
    res.status(500).send("fail to add user");
  }
})

router.put('/users/:id', (req, res) => {
  const id_user = req.params.id;
  const user = dbjson.users.find( user => user.id === parseInt(id_user));
  const { id, name, age } = req.body;
  const newUser = {
  id: dbjson.users.length + 1,
  name,
  age
  }
  user.id = id;
  user.name = name;
  user.age = age;
  dbjson.users.push(newUser);
  try{
  fs.writeFileSync(path.resolve('db.json'), JSON.stringify(dbjson,null,2));
  res.status(204).json(newUser);
  } 
  catch(error){
    res.status(500).send("fail to update user");
  }
})

router.delete('/users/:id', (req, res) => {
  const id_user = req.params.id;
  const user = dbjson.users.findIndex( user => user.id === parseInt(id_user));

  if(user == -1) {
    return res.status(404).send('User not found');
  }

  dbjson.users.splice(user, 1);

  try {
    fs.writeFileSync(path.resolve('db.json'), JSON.stringify(dbjson, null, 2));
    res.status(200).send("User deleted successfully"); 
  } catch (error) {
    res.status(500).send("Failed to delete user"); 
  }
})



export default router;