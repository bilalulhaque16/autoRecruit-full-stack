import * as bcrypt from "bcrypt";

function hashPassword(password){
    return bcrypt.hash(password, 10);
}

function compareHashPassword(given_password, stored_password){
    return bcrypt.compare(given_password, stored_password)
}

export {hashPassword, compareHashPassword}