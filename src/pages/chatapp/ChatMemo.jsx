import React from 'react'
import ChatBoxReciever, { ChatBoxSender } from './ChatBox'

function ChatMemo({ chat, userData, receiverData }) {

    console.log("both comparision ", chat?.senderId, userData?._id);

    return (
      <>
        {chat?.senderId === userData?._id ? (
          <ChatBoxSender key={chat?._id} message={chat?.text} userData={userData} />
        ) : (
          <ChatBoxReciever key={chat?._id} message={chat?.text} userData={receiverData} />
        )}
      </>
    );
  };

// export default memo(ChatMemo)
export default ChatMemo
