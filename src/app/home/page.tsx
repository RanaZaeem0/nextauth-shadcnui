'use clinet'
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
export default async function  home (){


const sesion = await getServerSession()
    
console.log("server home",sesion);


    return <div className="bg-black h-screen w-full text-white">

               <div className="">
                  <h1>ome: </h1>
                </div> 
        <button >sign in</button>
    </div>
}