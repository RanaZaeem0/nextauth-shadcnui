import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { db } from "./db";
import bcrypt from "bcrypt"

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Enter your email" },
        password: { label: "password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;
               const hashedPassword = await bcrypt.hash(password,10);
        // Validate the user's credentials here (e.g., check in the database)
          const userEcicterd = await db.user.findUnique({
            where:{
              email
            }
          })
          if(userEcicterd){

          }

        const craeteUser =   await db.user.create({
            data:{
              email,
              password:hashedPassword,
            },
          })
          return craeteUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      // Add user properties to token during the login phase
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Map token properties to session.user
      if (session.user) {
        session.user.id = token.id; // Add custom properties
        session.user.name = token.name;
        session.user.email = token.email;
      }
      console.log("Updated Session:", session);
      return session;
    },
    page:{
      signIn:"/signin"
    }
  },
};
