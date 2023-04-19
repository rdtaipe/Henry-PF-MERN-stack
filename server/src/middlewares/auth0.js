//aqui el midleware de auth0
import {expressjwt as jwt} from 'express-jwt'
import jwksRsa  from 'jwks-rsa'

const auth0Config = {
  domain: "dev-y87rrc6okknde1vd.us.auth0.com",
  clientId: "NJhnQ2kb0Ezl8CukUfsBI8ns4s3IxUkF",
  audience: "https://dev-y87rrc6okknde1vd.us.auth0.com/api/v2/",
  scope: "read:current_user update:current_user_metadata",
};

// export const auth0Middleware = auth({
//   audience: auth0Config.audience,
//   issuerBaseURL: `https://${auth0Config.domain}`,
//   tokenSigningAlg: "RS256",
// });

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: auth0Config.audience, //replace with your API's audience, available at Dashboard > APIs
  issuer: `https://${auth0Config.domain}/`,
  algorithms: [ 'RS256' ]
})
// .unless({path: ['/']});

export default checkJwt
