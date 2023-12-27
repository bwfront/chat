import React from "react";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabase";
import MessageForm from "@/components/MessageForm";
import RealtimeMessages from "../../lib/realtime-message";

export default async function Page({ params }: { params: { chat: string } }) {
  const { userId } = auth();
  const otherUserId = params.chat;
  let chat: any;

  const newChat = {
    participants: [userId, otherUserId],
    uid: uuidv4(),
  };

  const searchChats = await supabase
    .from("pchat")
    .select()
    .contains('participants', [otherUserId, userId])

    //Fix that conatins shpudl be like match maybe db structure xchange 
  console.log(searchChats);
  
  if (searchChats.data!.length > 0) {
    chat = searchChats.data![0];
  } else {
    const createChat = await supabase.from("pchat").insert(newChat);
    chat = newChat;
  }
  
  const props = {
    chat: chat,
    userId: userId,
    reciver: otherUserId,
  };

  const { data } = await supabase
    .from("messages")
    .select("id, message, sender, reciver, chatid, created_at")
    .filter("chatid", "eq", chat.uid);

  return (
    <div className="w-full flex justify-end flex-col">
      <RealtimeMessages userid={userId!} loadmessages={data ?? []} />
      <div className="flex gap-5 w-full py-5 px-16 bg-white shadow-lg dark:text-white dark:bg-medium">
        <MessageForm m={props} />
      </div>
    </div>
  );
}
