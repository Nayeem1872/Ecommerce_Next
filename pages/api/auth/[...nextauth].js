import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

const adminEmails = ['chelsea.nayeem99@gmail.com']

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  adapter : MongoDBAdapter (clientPromise),
  callbacks:{
    session:({session,token,user})=>{
      if(adminEmails.includes(session?.user?.email)){
        return session
      }else{
        return false
      }
    },
  } ,
} 

export default NextAuth(authOptions);
export async function isAdminRequest (req,res){
  const session = await getServerSession (req,res,authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    throw 'Sorry....You are not an admin!!';
  }
}