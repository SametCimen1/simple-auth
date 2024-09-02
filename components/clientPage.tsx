"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Page(){
    const { data: session, update } = useSession()


    if(!session?.user) return null;
    return(
        <div>
            <Image
                src = {session.user?.image || ""}
                alt='User Icon'
                width={100}
                height={100}
                className='rounded-xl'
            />
            <h1>{session.user?.name}</h1>
        </div>
    )
}