// ** Core JWT Import
import useJwt from "@src/@core/auth/jwt/useJwt"
import { config } from "@src/config"

// ** JWT Config
const jwtConfig = {
  baseURL: config.baseURL
}
const { jwt } = useJwt(jwtConfig)

export default jwt
