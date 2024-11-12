import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    maxAge: number;
    updateAge: number;
    user: {
      role: string; // 'teacher' or 'student'
    } & DefaultSession['user'];
  }

  interface User {
    accessToken?: string;
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    given_name?: string;
    family_name?: string;
  }
}
