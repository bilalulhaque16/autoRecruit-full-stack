import jwt from "jsonwebtoken";
import ROLES from "../util/roles_list.util.js";

import { getConnection } from "../db/connectionManager.config.js";


function oAuth(req, res, next) {
  const { clientid, clientsecret } = req.headers;
  if (
    req.headers.hasOwnProperty("clientid") &&
    req.headers.hasOwnProperty("clientsecret")
  ) {


    const dbConnection = getConnection();
    const db_name = req.tenantName;
    const User = dbConnection.model("user_account");

    User.findOne({company_name: db_name}, function(err, foundData){
      if(err) return res.json(err)

      if(!foundData) return res.status(200).json("Data doesnot exist")

      if (
        foundData.clientId == clientid &&
        foundData.clientSecret == clientsecret
      ) {
          req.user = {
              email: foundData.email,
              id: foundData._id,
              role: ROLES.Admin
            }
            console.log("REQ oAuth===>", req.user)
  
            next();
  
      } 
      else {
        return res.status(401).json("Invalid clientId clientSecret");
      }
    })

  } else {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json("Token is null");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user){
        if(err) return res.status(403).json({
            message: "Error",
            description: "Token expired or invalid"
        })
        
        req.user = user;
        console.log("REQ ===>", req.user)
        next();
    })
  }
}



export default oAuth;