"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function Nav() {
  const { user } = useUser();
  const router = useRouter();
  function handleLogin() {
    router.push("/chat");
  }
  function handleHome() {
    router.push("/");
  }
  const username = user?.username || "user";
  return (
    <div className="h-20 flex items-center px-16 justify-between bg-white shadow-md dark:bg-dark dark:text-white" >
      <div
        className="font-bold mr-5 cursor-pointer"
        onClick={() => handleHome()}
      >
        chat.
      </div>
      <SignedIn>
        <div className="flex gap-2 items-center">
          welcome. <div className="font-bold mr-5">{username}.</div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button
            type="button"
            onClick={() => handleLogin()}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
          >
            login.
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
