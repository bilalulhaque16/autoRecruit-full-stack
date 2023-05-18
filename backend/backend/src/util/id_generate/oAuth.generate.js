import { fromString } from "uuidv4";
import bcrypt from "bcrypt";


function clientIdGenerate(name){
    const client_id = fromString(name)
    return `${client_id}-${Date.now()}`
}

async function clientSecretGenerate(id){
    // const key = id + process.env
    const client_secret = await bcrypt.hash(id, parseInt(process.env.SALT_ROUNDS));
    return client_secret;
}
export {clientIdGenerate, clientSecretGenerate};