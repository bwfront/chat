import React from "react";
import { auth } from "@clerk/nextjs";
import Messages from "@/components/Messages";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabase";

export default async function Page({ params }: { params: { chat: string } }) {
  const { userId } = auth();
  const otherUserId = params.chat;
  let chat: any;

  const searchChats = await supabase
    .from("pchat")
    .select("")
    .contains("participants", [userId || "", otherUserId]);

  const newChat = {
    participants: [userId, otherUserId],
    uid: uuidv4(),
  };

  if (searchChats.data!.length > 0) {
    chat = searchChats.data![0];
  } else {
    const createChat = await supabase.from("pchat").insert(newChat);
    chat = createChat;
  }

  async function handleSubmit(data: FormData) {
    "use server";
    if (!data.get("message")) return;
    const test = await supabase.from("messages").insert({
      chatid: chat.uid,
      message: String(data.get("message")),
      sender: userId,
      reciver: otherUserId,
    });
    

  }

  return (
    <div className="w-full flex justify-end flex-col">
      <Messages id={chat.uid} />
      <div className="mt-10 flex gap-5 w-full p-5 bg-white">
        <form action={handleSubmit} className="flex w-full items-center  gap-3">
          <input
            className="outline-blue-200 outline flex-grow px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
            type="text"
            placeholder="message"
            name="message"
          />
          <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">send.</button>
        </form>
      </div>
    </div>
  );
}
