const regexEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3}$/ ;
const regexPhone = /^09[0-9]{9}/;

const userValidate = ( req, res, next ) => {
  const user = req.body;

  if(user.name.length < 10 || !user.name) {
    res.send("Name error!");
  }

  if( user.age <= 0  || user.age >= 20){
    res.send("Age error!");
  }

  if(user.gender !== "male" && user.gender !== "female"){
    res.send("Gender error!");
  }

  if(!regexEmail.test(user.email)){
    res.send("Email error!");
  }

  if(!regexPhone.test(user.phone)){
    res.send("Phone error!");
  }
  
  next();
}

export default userValidate;