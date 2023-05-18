import jwt from "jsonwebtoken";
import generateAccessToken from "./generate_access.token.js";
const createNewAccessToken = (token) => {
    const verified_token = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const payload = {
        email: verified_token.email,
        id: verified_token.id,
        role: verified_token.role
    }

    return generateAccessToken(payload)

};

export default createNewAccessToken;