import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import {getUserByEmail} from '@/data/users'

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    session:{
        strategy:"jwt"
    },
    providers:[
        // google({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //     authorization:{
        //         params:{
        //             prompt: "consent",
        //             access_type:"offline",
        //             response_type:"code"
        //         }
        //     }
        // })
        github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials){
            if(credentials === null) return null;
                try {
                    const user = getUserByEmail(credentials?.email);
                    console.log('FOUND USER')
                    console.log(user);
                    if(user){
                        console.log("INSIDE USER ")
                        console.log(user?.password)
                        console.log(credentials)
                        const isMatch = user?.password === credentials?.password;
                        if(isMatch){
                            console.log("THERE IS A MATCH")
                            return user;
                        }else{
                            throw new Error("password not correct!");
                        }
                    }else{  
                        throw new Error('user not found')
                    }
                } catch (error) {
                    return new Error('error occured, please try again later')
                }
            }
        })
    ]
})