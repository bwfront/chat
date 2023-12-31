"use server"
import supabase from "@/lib/supabase";

export async function handleSubmit(data: FormData, chat: any) {
  if (!data.get("message")) return;
  console.log(chat.chat.uid);
  await supabase.from("messages").insert({
    chatid: chat.chat.uid,
    message: String(data.get("message")),
    sender: chat.userId,
    reciver: chat.reciver,
  });
}
