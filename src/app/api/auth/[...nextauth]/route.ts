import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            const {email,password} = credentials
            return {
                id: "user1",
                email,
                password
            };
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/signin"
  }
})

export { handler as GET, handler as POST }