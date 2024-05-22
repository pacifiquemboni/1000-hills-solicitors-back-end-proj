import jwt from "jsonwebtoken";

export class JWT{
  static generateJwt(data, exp='1d'){
    const tokenPayload={
      ...data,
      role:data.role,
      email:data.email
    }
    return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: exp }); 
  }
}