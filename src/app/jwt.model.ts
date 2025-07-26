import { JWTPayload, jwtVerify, SignJWT } from 'jose';

export class Jwt {
  /**
   * JWT's signing secret
   * WARNING: DO NOT DO THIS! PUT THEM ON ENVIRONMENT VARIABLE INSTEAD. PEOPLE CAN SEE YOUR CODE!
   * @private
   */
  private static JWT_SECRET = new TextEncoder().encode('secret:)');

  /**
   * Sign a JWT key and return them
   * @param payload
   */
  static async sign(payload: JWTPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(Jwt.JWT_SECRET);
  }

  /**
   * Verify JWT token, will throw an error if failed
   * @param token
   */
  static async verify(token: string) {
    return jwtVerify(token, Jwt.JWT_SECRET);
  }
}
