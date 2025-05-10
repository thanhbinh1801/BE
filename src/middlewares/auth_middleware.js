import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const secret_key = process.env.JWT_secret_key;

class AuthenticateToken{
  
  static AuthRefreshToken(req, res, next){
    try{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
        return res.status(401).json({ msg: "No refresh token provided"});
      }
      jwt.verify(refreshToken, secret_key, (err, decode) => {
        if(err) return res.status(403).json({msg: "verify error"});
        req.user = decode;
        next();
      })
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