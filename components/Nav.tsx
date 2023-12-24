'use client'
import { UserButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";

export default function Nav(){
const {user, isLoaded} = useUser();
const router = useRouter();
function handleLogin(){
    router.push("/chat");
}
function handleHome(){
    router.push("/");
}

const username = user?.username || "user";
    return(
        <div className="h-20 flex items-center px-24 justify-between bg-white shadow-md">
            <div className="font-bold mr-5 cursor-pointer" onClick={() => handleHome()}>chat.</div>
            {isLoaded && user &&
            <div className="flex gap-2 items-center">welcome, <div className="font-bold mr-5">{username}</div>
            <UserButton afterSignOutUrl="/"/> 
            </div>
            }
            {!user &&
            <button type="button" onClick={() => handleLogin()} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">login.</button>
            }
        </div>
    )
}