const regexEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{3}$/ ;
const regexPhone = /^09[0-9]{9}/;

const userValidate = ( req, res, next ) => {
  const user = req.body;
  let check = false;
  let errorArr = [];

  if(user.name.length < 10 || !user.name) {
    errorArr.push("Name Error");
    check = true;   
  }

  if( user.age <= 0  || user.age >= 20 || isNaN(user.age)){
    errorArr.push("Age is invalid");
    check = true;
  }

  if(user.gender !== "male" && user.gender !== "female"){
    errorArr.push("Gender Error");
    check = true;
  }

  if(!regexEmail.test(user.email)){
    errorArr.push("Email Error");
    check = true;
  }

  if(!regexPhone.test(user.phone)){
    errorArr.push("Phone Error");
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

export default userValidate;