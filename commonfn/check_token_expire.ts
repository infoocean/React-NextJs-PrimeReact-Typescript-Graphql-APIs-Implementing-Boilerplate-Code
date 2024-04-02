const jwt = require('jsonwebtoken');
export function isTokenExpired(token:string) {
  // Decode the token without verifying the signature
  const decodedToken = jwt.decode(token, { complete: true });
  if (decodedToken && decodedToken.payload.exp) {
    const expirationTimestamp = decodedToken.payload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= expirationTimestamp;
  } else {
    // Invalid token format or missing expiration claim
    return true; // Treat as expired for safety
  }
}
