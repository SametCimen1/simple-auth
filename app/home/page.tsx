import {auth} from '@/auth'
import LogoutForm from '@/components/LogoutForm';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { SessionProvider } from "next-auth/react"
import ClientPage from '@/components/clientPage'
export default async function Page(){
    const session = await auth();

    if(session?.user){
        session.user = {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || ""
        }
    }


    if(!session?.user){
        redirect('/login')
    }


    return(
        <div className='flex flex-col items-center m-4 '>    

            <SessionProvider basePath={"/api/auth"} session={session}>
                <ClientPage/>
            </SessionProvider>

            <LogoutForm />
        </div>
    )
}