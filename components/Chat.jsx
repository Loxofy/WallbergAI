"use client";

import { db } from "@/firebase";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./message";

function Chat({ chatId }) {
  const bottomRef = useRef(null);
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session.user.email,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  useEffect(() => {
  
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  return <div className=" flex flex-1 flex-col overflow-y-auto">
    {messages?.empty && (
      <>
        
      <p className="mt-10 text-center text-white">
        Ask anything in your mind to get started
      </p>
      <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce"/>
      </>
      
    )}
{messages?.docs.map(message=><Message key={message.id} message={message.data()} />)}
  <div ref={bottomRef} /> 

  </div>;
}

export default Chat;
