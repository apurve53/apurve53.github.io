import React, { useState, useEffect, useRef } from 'react';
import { relatedChat } from "../data/chatFile";
import "../UI/chat.css"

function FirstChatOptions() {
  const [chatData, setChatData] = useState({});
  const [selectedChat, setSelectedChat] = useState([])

  useEffect(() => {
    getUserchat();
  }, [])

  const getUserchat = async () => {
    let response = await fetch('http://worlddevelopment.in/userchat', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ 'user': sessionStorage.getItem('user') }),
      credentials: 'include',
    });
    if (response.ok) {
      let respData = await response.json();
      if (Object.entries(respData).length == 0) {
        setChatData(relatedChat);
      } else {
        setChatData(respData);
      }
    }
  }

  function handleClick(chat) {
    if (Object.keys(chatData[chat]).length > 0) {
      setChatData(chatData[chat]);
      setSelectedChat([...selectedChat, chat]);
    }
  }

  function handleBackButton() {
    let tempChatData = { ...relatedChat };
    let tempSelected = [...selectedChat];
    if (tempSelected.length == 0) {
      alert("This is First Page")
    } else {
      tempSelected.pop();
      setSelectedChat(tempSelected);
      if (tempSelected.length == 0) {
        setChatData({ ...relatedChat });
      } else {
        for (let i = 0; i < tempSelected.length; i++) {
          tempChatData = tempChatData[selectedChat[i]];
        }
        setChatData(tempChatData)
      }
    }
  }

  return (
    <div>
      <button onClick={handleBackButton} className='chat-back-button'>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M15 6.99L8 12.99 15 19z" />
        </svg>
      </button>
      <div className="scrolable">
        {Object.keys(chatData).map((chat, index) => (
          <div className='chat-option' key={`${chat}index`} onClick={() => handleClick(chat)}>{chat}</div>
        ))}
      </div>
    </div>
  )
}
const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  function handleSend() {
    console.log("hendling Send chat");
  }
  if (isOpen) {
    return (
      <div>
        <div className="chat-box">
          <div className="chat-top-bar" onClick={toggleChat}>How can I help you</div>
          <div className="chat-area">
            <FirstChatOptions />
          </div>
          <div className="text-area">
            <textarea name="chatarea" className="text-area"></textarea>
            <button onClick={handleSend} className="send-button">Send</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="chat-button">
        <button onClick={toggleChat}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="pink" strokeWidth="5" />
            <path
              d="M12 16v-1c0-1.1.9-2 2-2h1v-1a3 3 0 10-3 3v1h-1v-1a4 4 0 115.5-3.5L14 10.5h-2c-1.1 0-2 .9-2 2v1h-1v-1a3 3 0 013-3h2.5L16 10.5a5 5 0 10-4 8.5h-1zm1 2v-2h-2v2h2z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    );
  }
};

export default Chat;
