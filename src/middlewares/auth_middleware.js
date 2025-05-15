import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const secret_key = process.env.JWT_secret_key;

class AuthenticateToken{
  
  static AuthRefreshToken(req, res, next){
    try{
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (!token) return res.sendStatus(401);

      const payload = jwt.verify(token, secret_key);
      req.user = payload;
      next()
    }
    catch(err){
      if(err.name == 'TokenExpiredError'){
        return res.status(403).json({ msg: "Refresh token expired" });
      }
      return res.status(403).json({ msg: "Invalid refresh token" });
    }
  }
}

export default AuthenticateToken;