import React from "react";
import { auth } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabase";
import MessageForm from "@/components/MessageForm";
import RealtimeMessages from "./realtime-message";

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

  const props = {
    chat: chat,
    userId: userId,
    reciver: otherUserId,
  };

  const { data } = await supabase
          .from("messages")
          .select("id, message, sender, reciver, chatid")
          .filter("chatid", "eq", chat.uid);

  return (
    <div className="w-full flex justify-end flex-col">
      <RealtimeMessages loadmessages={data ?? []} />
      <div className="mt-10 flex gap-5 w-full p-5 bg-white">
        <MessageForm m={props} />
      </div>
    </div>
  );
}
