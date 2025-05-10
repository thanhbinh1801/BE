import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const secret_key = process.env.JWT_secret_key;
console.log(secret_key)

export default class CreateToken{
  static genAccessToken (user){
    return jwt.sign({id: user.id, username: user.username}, secret_key, {expiresIn: '5m'});
  }
  static genRefreshToken(user){
    return jwt.sign({id: user.id, username: user.username}, secret_key, {expiresIn: '30d'});
  }
}