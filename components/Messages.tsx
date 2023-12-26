import React from "react";
import supabase from "@/lib/supabase";
import RealtimeMessages from "@/app/c/[chat]/realtime-message";

export default async function Messages(props: any) {
  const chatid = props.id;
  const { data } = await supabase
          .from("messages")
          .select("id, message, sender, reciver, chatid")
          .filter("chatid", "eq", chatid);
       
      

  return (
    <RealtimeMessages loadmessages={data ?? []} />
  );
}
