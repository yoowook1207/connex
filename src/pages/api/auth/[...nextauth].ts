import NextAuth, {NextAuthOptions, Session} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {JWT} from "next-auth/jwt";
import {createUser, findUserByEmail} from '~/pages/api/user';
import { sign } from 'jsonwebtoken'; // Import sign function

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // Default session max age: 30 days
        updateAge: 24 * 60 * 60, // Default session update age: 1 day
    },
    callbacks: {
        async signIn({profile}) {
            if (!profile || !profile.email || !profile.name) {
                console.error('Email or name is missing in the user object:', profile);
                return false; // Prevent sign-in if critical information is missing
            }
            const existingUser = await findUserByEmail(profile.email);
            if (!existingUser || !existingUser.email) {
                await createUser({
                    email: profile.email!,
                    firstName: profile.given_name || '',
                    lastName: profile.family_name || '',
                    role: "",
                });
            }
            return true;
        },
        async jwt({token, account, profile}) {
            const existingUser = await findUserByEmail(token!.email as string);
            token.role = existingUser.role;

            if (account && profile) {
                const jwtPayload = {
                    email: profile.email!,
                    firstName: profile.given_name || '',
                    lastName: profile.family_name || '',
                    role: token.role,
                }
                token.accessToken = sign(jwtPayload, process.env.JWT_SECRET!, { expiresIn: '30d' });
            }
            return token;
        },
        async session({session, token}: { session: Session; token: JWT }) {
            session.accessToken = token.accessToken as string;
            if (token.role) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
