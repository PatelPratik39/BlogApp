// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const authenticateToken = (request, response, next) => {
//   const authHeader = request.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) {
//     return response.status(401).json({ message: "Token is missing" });
//   }
//   jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
//     if (error) {
//       return response.status(403).json({ message: "Invalid Token" });
//     }

//     request.user = user;
//     next();
//   });
// };

import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = { id: user._id, username: user.username };        //this line of code help me to get loggedin user details so i can store in db
    // console.log("Authenticated user:", req.user); 
    // req.user = user; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
