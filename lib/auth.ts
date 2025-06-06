import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Store the secret as a plain string
const JWT_SECRET_KEY = 'your-secret-key-here';

// Mock admin credentials
const ADMIN_USER = {
  email: 'admin@example.com',
  password: 'password123',
};

export async function loginUser(email: string, password: string): Promise<boolean> {
  // Simple email/password validation
  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    // Create and store JWT token in cookies (client-side in this demo)
    const token = await generateToken(email);
    
    // In a client component, we're storing in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    
    return true;
  }
  
  return false;
}

export async function generateToken(email: string): Promise<string> {
  // Convert the secret to Uint8Array only when needed
  const secret = new TextEncoder().encode(JWT_SECRET_KEY);
  
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
    
  return token;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    // Convert the secret to Uint8Array only when needed
    const secret = new TextEncoder().encode(JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return !!payload;
  } catch (error) {
    return false;
  }
}

export function getUserEmail(): string | null {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    
    // In a real app, we would decode the JWT payload to get user info
    return ADMIN_USER.email;
  }
  return null;
}

export function isUserLoggedIn(): boolean {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('auth_token');
  }
  return false;
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  }
}