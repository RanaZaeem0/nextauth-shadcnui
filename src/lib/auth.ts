
import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
          const { email, password } = credentials
          return {
            id: "1",
            name:"zain",
            email,
            password
          };
        },
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token,  user }:any) {
          token.userId = token.sub
      
        return token
      },
      session: ({ session, token, user }: any) => {
        if (session && session.user) {
          session.user.id = token.userId
        }
        if(session.user){
          console.log("session.user true",session.user);
          
        }
        return session
      }
    },
    pages: {
      signIn: "/signin"
    }
  }