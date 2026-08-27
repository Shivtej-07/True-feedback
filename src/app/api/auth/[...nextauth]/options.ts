import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/user';

type AppUser = {
  _id?: string | { toString(): string };
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
};

type AppToken = JWT & {
  _id?: string;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: {
          label: 'Email or Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error('Email/username and password are required');
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error('No user found with this email or username');
          }

          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          }

          throw new Error('Incorrect password');
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : 'Authentication failed';
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const appToken = token as AppToken;
      const appUser = user as AppUser | undefined;

      if (appUser) {
        appToken._id = appUser._id
          ? typeof appUser._id === 'string'
            ? appUser._id
            : appUser._id.toString()
          : undefined;
        appToken.isVerified = appUser.isVerified;
        appToken.isAcceptingMessages = appUser.isAcceptingMessages;
        appToken.username = appUser.username;
      }

      return appToken;
    },
    async session({ session, token }) {
      const appToken = token as AppToken;
      const appSessionUser = (session.user ??= {}) as typeof session.user & {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
      };

      appSessionUser._id = appToken._id;
      appSessionUser.isVerified = appToken.isVerified;
      appSessionUser.isAcceptingMessages = appToken.isAcceptingMessages;
      appSessionUser.username = appToken.username;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};