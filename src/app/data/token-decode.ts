import jwt_decode from "jwt-decode";
export function decodeToken(token: string) {
  return jwt_decode(token);
  }