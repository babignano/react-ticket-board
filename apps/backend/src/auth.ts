import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import type { FastifyRequest } from 'fastify';

// JWKS client to fetch Auth0's public keys
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
});

// Get the signing key from Auth0
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export interface AuthUser {
  sub: string;        // User ID from Auth0
  email?: string;
  permissions?: string[];
}

export interface Context {
  user: AuthUser | null;
}

// Verify JWT and extract user info
export async function getUser(request: FastifyRequest): Promise<AuthUser | null> {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7); // Remove 'Bearer '

  return new Promise((resolve) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          console.error('JWT verification failed:', err.message);
          resolve(null);
          return;
        }

        const payload = decoded as jwt.JwtPayload;
        resolve({
          sub: payload.sub!,
          email: payload.email,
          permissions: payload.permissions,
        });
      }
    );
  });
}
