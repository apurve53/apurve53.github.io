import React, { useEffect, useRef, useState } from 'react'
import { relatedChat } from '../data/chatFile.js';
import ContextMenue from "./ContextMenue.jsx";
import QueryWindow from "./QueryWindow.jsx";

import { contextMenueButtons } from "../data/contextMenueButtons.jsx"
import io from 'socket.io-client';
let tempChat = {};
export default function AddChatPage() {
  const url = `https://worlddevelopment.in/chatcreate?user=${sessionStorage.getItem('user')}`;
  const [isloader, setIsLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const chatRef = useRef({});
  const clientsChatRef = useRef({});
  const socketRef = useRef(null);
  const opsRef = useRef(0);
  const contextMenueRef = useRef(null);
  const editElementRef = useRef(null);
  const [keyList, setKeyList] = useState([]);
  const [contextMenue, setContextMenue] = useState({
    position: {
      x: 0,
      y: 0
    },
    toggled: false,
  })
  // const chatWindowData = useRef([]);
  const [chatWindowData, setChatWindowData] = useState([]);
  const chatWindowDataRef = useRef([]);

  useEffect(() => {
    getUserChat();
    getAllChatWindows();
    getSocketConnection();
  }, [])
  async function getAiGenratedChat() {
    setbuttonLoader(true);
    let response = await fetch('http://worlddevelopment.in/get_all_AI_Genrated_Chat', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ 'user': sessionStorage.getItem('user') }),
      credentials: 'include',
    });
    if (response.ok) {
      setbuttonLoader(false);
      // let result = await response.json();
      // console.log(result);
      // console.log(result);
    }
  }
  async function getAllChatWindows() {
    let response = await fetch('http://worlddevelopment.in/get_all_chats_of_admin', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ 'user': sessionStorage.getItem('user') }),
      credentials: 'include',
    });
    if (response.ok) {
      let result = await response.json();
      chatWindowDataRef.current = result;
      setChatWindowData(result);
    }
  }

  async function updateUsersClientChats(msgFrom, chat) {
    let response = await fetch('http://worlddevelopment.in/update_users_client_chat', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ 'user': sessionStorage.getItem('user'), 'from': msgFrom, 'chat': chat }),
      credentials: 'include',
    });
    if (response.ok) {
      let tempData = JSON.parse(JSON.stringify(chatWindowDataRef.current));
      let updated = false;
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].from === msgFrom) {
          tempData[i].chat.push({ from: msgFrom, chat });
          updated = true;
          break;
        }
      }
      if (updated) {
        chatWindowDataRef.current = tempData;
        setChatWindowData(tempData);
      } else {
        chatWindowDataRef.current.push({ 'user': sessionStorage.getItem('user'), 'from': msgFrom, 'isOnline': 'green', 'chat': [{ 'from': msgFrom, 'chat': chat }] })
        setChatWindowData(JSON.parse(JSON.stringify(chatWindowDataRef.current)))
      }
    }
  }

  async function getSocketConnection() {
    if (!socketRef.current) {
      socketRef.current = io.connect('http://worlddevelopment.in', {
        secure: true,
        reconnection: true,
        rejectUnauthorized: false, // Set to true in production
        query: { user: window.sessionStorage.getItem("user"), type: "adminUser" }
      });
      socketRef.current.on('chat', (msg) => {
        let mesgFrom = msg.from;
        let chatMsg = msg.chat;
        updateUsersClientChats(mesgFrom, chatMsg);
      })
      socketRef.current.on('statuschange', (desconnectedSocket) => {
        let tempChatData = JSON.parse(JSON.stringify(chatWindowDataRef.current));
        for (let i = 0; i < tempChatData.length; i++) {
          if (tempChatData[i].from === desconnectedSocket.from) {
            tempChatData[i]["isOnline"] = 'red';
            break;
          }
        }
        setChatWindowData(tempChatData);
      })
      socketRef.current.on('connect', () => {
        console.log('Socket connected!');
      });
    }
  }
  // const getDimentions = async function () {
  //   const screenWidth = window.innerWidth;
  //   const screenHeight = window.innerHeight;
  //   let response = await fetch("http://worlddevelopment.in/getdimention", {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ widthe: screenWidth, height: screenHeight }),
  //     credentials: 'include'
  //   })
  //   if (response.ok) {
  //     const data = await response.json();
  //   }
  // }
  const copyText = () => {
    navigator.clipboard.writeText(url)
      .then(() => alert('Copied to clipboard!'))
      .catch((error) => console.error('Failed to copy text: ', error));
  };
  async function getUserChat() {
    setIsLoader(true)
    try {
      let response = await fetch('http://worlddevelopment.in/userchat', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ 'user': sessionStorage.getItem('user') }),
        credentials: 'include',
      });
      if (response.ok && response.status === 200) {
        let respData = await response.json();
        if (Object.entries(respData).length == 0) {
          chatRef.current = {};
          setKeyList([{ "selectedKey": "", "relatedKeys": Object.keys(chatRef.current) }]);
        } else {
          chatRef.current = respData;
          setKeyList([{ "selectedKey": "", "relatedKeys": Object.keys(chatRef.current) }]);
        }
      }
    }
    catch (error) {
      console.error("fetch error in geting userchat");
    } finally {
      setIsLoader(false);
    }
  }
  ///////////////////////////////////Reset chat system area /////////////////////////////
  async function resetChatFetch(ops) {
    setIsLoader(true);
    try {
      let response = await fetch('http://worlddevelopment.in/resetchat', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: ops == 2 ? JSON.stringify({ user: sessionStorage.getItem('user'), samplechat: {} }) : JSON.stringify({ user: sessionStorage.getItem('user') }),
        credentials: 'include'
      });
      if (response.ok) {
        if (ops == 2) {
          let sampleChat = await response.json();
          chatRef.current = sampleChat;
        } else {
          chatRef.current = {};
        }
        setKeyList([{ "selectedKey": "", "relatedKeys": Object.keys(chatRef.current) }]);
        let status = opsRef.current == "updated" ? ops == 1 ? "You have cleared your chat Data Now you can Write your new Chat Data" : "Your Sample Chat is here Now" : ops == opsRef.current ? "You dont need to do this, I think" : ops == 1 ? "You have cleared your chat Data Now you can Write your new Chat Data" : "Your Sample Chat is here Now"
        alert(status);
        opsRef.current = ops;
      }
    } catch (err) {
      alert("Error Reseting Chat : ", err);
    } finally {
      setIsLoader(false);
    }
  }

  async function resetChat(evt) {
    console.log("evt : ", evt);
    console.log("opsRef.current : ", opsRef.current);
    opsRef.current == 1 ? alert("You dont need to do this, I think") : window.confirm("are you Sure to remove") ? await resetChatFetch(1) : opsRef.current = opsRef.current;
  }

  async function resetSampleChat() {
    await resetChatFetch(2);
    chatRef.current = { ...relatedChat };
    setKeyList([{ "selectedKey": "", "relatedKeys": Object.keys(chatRef.current) }]);
  }
  ////////////////////////////////////Reset chat system area/////////////////////////////////////////////////////////////

  //////////////////////////////////////Add caht Area//////////////////////////////////////////////////////////////////////

  async function handleUserChat(userchat) {
    setIsLoader(true);
    try {
      let response = await fetch("http://worlddevelopment.in/clientchatadd", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "chat": userchat, 'user': sessionStorage.getItem('user') }),
        credentials: 'include',
      })
      if (response.ok) {
        let responseData = await response.json();
        if (responseData.user == sessionStorage.getItem('user')) {
        }
      }
    } catch (error) {
      window.alert("Error while client chat add");
    } finally {
      setIsLoader(false);
    }
  }

  async function handleAddChat() {
    let textAreaElement = document.getElementById("questiontext");
    let newData = textAreaElement.value.trim();
    opsRef.current = "updated";
    let tempChat = chatRef.current;
    if (keyList.length == 1) {
      chatRef.current[newData] = {};
    } else if (keyList.length == 0) {
      chatRef.current[newData] = {};
    } else {
      for (let i = 0; i < keyList.length - 1; i++) {
        let key = keyList[i]["selectedKey"];
        tempChat = tempChat[key];
      }
      tempChat[newData] = {};
    }
    let tempKeyList = [...keyList];
    tempKeyList[tempKeyList.length - 1].relatedKeys.push(newData);
    setKeyList(tempKeyList);
    handleUserChat(chatRef.current);
    textAreaElement.value = "";
  }

  const handleSelection = (event) => {
    removeContextMenue();
    if (event.button === 0) {
      setIsLoader(true);
      try {
        let key = event.target.innerText;
        let tempKeyList = [...keyList];
        let level = keyList.length;
        for (let i = 0; i < level; i++) {
          if (tempKeyList[i]["relatedKeys"].includes(key)) {
            tempKeyList[i]["selectedKey"] = key;
            let indexFromRemove = i + 1;
            tempKeyList = tempKeyList.slice(0, indexFromRemove);
            tempChat = chatRef.current;
            for (let j = 0; j < tempKeyList.length; j++) {
              tempChat = { ...tempChat[tempKeyList[j]["selectedKey"]] }
            }
            tempKeyList.push({ "selectedKey": "", "relatedKeys": Object.keys(tempChat) });
            setKeyList(tempKeyList);
            break;
          }
        }
      } catch (error) {
        alert("Somthing went wrong Plese Select again");
        console.log("error while Selection chat : ");
      } finally {
        setIsLoader(false);
      }

    }
  }
  /////////////////////////////////////////////////////////Add chat ARea//////////////////////////////////////////////////

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("dragedItem", e.target.innerText);
    e.dataTransfer.setData("pickedIndex", index);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e, dropIndex) => {
    setIsLoader(true);
    let pickedItem = e.dataTransfer.getData("dragedItem");
    let onDropItem = e.target.innerText;
    let tempKeyList = [...keyList]
    for (let i = 0; i < tempKeyList.length; i++) {
      if (tempKeyList[i]["relatedKeys"].includes(pickedItem) && tempKeyList[i]["relatedKeys"].includes(onDropItem)) {
        let oprativeRelatedKeysList = tempKeyList[i]["relatedKeys"];
        for (let j = 0; j < tempKeyList[i]["relatedKeys"].length; j++) {
          if (oprativeRelatedKeysList[j] == pickedItem) {
            oprativeRelatedKeysList[j] = onDropItem;
          } else if (oprativeRelatedKeysList[j] == onDropItem) {
            oprativeRelatedKeysList[j] = pickedItem;
          }
        }
        afterDragAndDrop(pickedItem, onDropItem, tempKeyList);
        break;
      }
    }
  }

  const afterDragAndDrop = async (pickedItem, onDropItem, tempKeyList) => {
    if (tempKeyList.length === 1) {
      handleFirstColumnCghange(tempKeyList);
    } else {
      if (Object.keys(chatRef.current).includes(pickedItem) && Object.keys(chatRef.current).includes(onDropItem)) {
        handleFirstColumnCghange(tempKeyList);
      } else {
        let deepCopyChat = { ...chatRef.current };
        let shalloCopyChat = deepCopyChat;
        for (let i = 0; i < tempKeyList.length - 1; i++) {
          if (tempKeyList[i + 1]["relatedKeys"].includes(pickedItem) && tempKeyList[i + 1]["relatedKeys"].includes(onDropItem)) {
            let tempObject = { ...shalloCopyChat[tempKeyList[i]["selectedKey"]] };
            let newObject = {};
            for (let j = 0; j < tempKeyList[i + 1]["relatedKeys"].length; j++) {
              newObject[tempKeyList[i + 1]["relatedKeys"][j]] = tempObject[tempKeyList[i + 1]["relatedKeys"][j]];
            }
            shalloCopyChat[tempKeyList[i]["selectedKey"]] = newObject;
            snedUpdatedChatToServer(deepCopyChat, tempKeyList)
            break;
          } else {
            shalloCopyChat = shalloCopyChat[tempKeyList[i]["selectedKey"]];
          }
        }
      }
    }
  }

  function handleFirstColumnCghange(tempKeyList) {
    let newChatObject = {};
    let relatedKeysOfChat = tempKeyList[0]["relatedKeys"];
    for (let i = 0; i < relatedKeysOfChat.length; i++) {
      newChatObject[relatedKeysOfChat[i]] = chatRef.current[relatedKeysOfChat[i]];
    }
    snedUpdatedChatToServer(newChatObject, tempKeyList);
  }

  async function snedUpdatedChatToServer(newChatObject, tempKeyList) {
    setIsLoader(true);
    try {
      let response = await fetch("http://worlddevelopment.in/clientchatadd", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ "chat": newChatObject, user: sessionStorage.getItem('user') }),
        credentials: 'include',
      })
      if (response.ok) {
        chatRef.current = newChatObject
        setKeyList(tempKeyList)
      }
    } catch (error) {
      console.log("error while setting up updating chat : ");
    } finally {
      setIsLoader(false);
    }
  }

  async function lgoout() {
    setIsLoader(true);
    try {
      sessionStorage.removeItem('user');
      let response = await fetch("http://worlddevelopment.in/logoutuser", {
        method: "POST",
        credentials: 'include',
      })
      if (response.ok) {
        sessionStorage.removeItem('user');
      }
    } catch (error) {
      window.alert("Refresh the page and go to the app again logout no confirmed");
    } finally {
      setIsLoader(false);
      window.location.href = 'http://worlddevelopment.in/';
    }
  }

  function changeEditedQuestion(oldValue, newValue) {
    setIsLoader(true);
    newValue = newValue.trim();
    let tempKeyList = [...keyList];
    let tempChat = chatRef.current;
    for (let i = 0; i < tempKeyList.length; i++) {
      if (tempKeyList[i]["relatedKeys"].includes(oldValue)) {
        tempKeyList[i]["relatedKeys"][tempKeyList[i]["relatedKeys"].indexOf(oldValue)] = newValue;
        if (tempKeyList[i]["selectedKey"] === oldValue) {
          tempKeyList[i]["selectedKey"] = newValue;
          break;
        }
      }
    }
    for (let i = 0; i < keyList.length; i++) {
      if (keyList[i]["relatedKeys"].includes(newValue)) {
        for (let j = 0; j < keyList[i]["relatedKeys"].length; j++) {
          let relatedKey = keyList[i]["relatedKeys"][j];
          if (relatedKey === newValue) {
            tempChat[newValue] = tempChat[oldValue];
            delete tempChat[oldValue]
          } else {
            let tempValue = JSON.stringify(tempChat[relatedKey]);
            delete tempChat[relatedKey];
            tempChat[relatedKey] = JSON.parse(tempValue);
          }
        }
      } else {
        let selectedObject = keyList[i]["selectedKey"];
        tempChat = tempChat[selectedObject];
      }
    }
    snedUpdatedChatToServer(chatRef.current, tempKeyList);
  }
  async function handleDeleteChat() {
    let tempKeyList = [...keyList];
    let tempChat = chatRef.current;
    let newKeyList = [];
    if (tempKeyList[0]["selectedKey"] === "") {
      alert("What to delete Please select somthing to delete");
    } else if (!tempKeyList[0]["relatedKeys"].includes(tempKeyList[0]["selectedKey"])) {
      newKeyList = [{ "selectedKey": "", "relatedKeys": [...tempKeyList[0]["relatedKeys"]] }]
      alert("You have to select somthing to delete");
    } else {
      let whatToDelete = tempKeyList[(tempKeyList.length - 1) - 1]["selectedKey"];
      for (let i = 0; i < tempKeyList.length; i++) {
        if (tempKeyList[i]["selectedKey"] !== whatToDelete) {
          newKeyList.push(tempKeyList[i]);
          tempChat = tempChat[tempKeyList[i]["selectedKey"]];
        } else {
          newKeyList.push({ "selectedKey": "", "relatedKeys": [...tempKeyList[i]["relatedKeys"]] });
          delete tempChat[whatToDelete];
          newKeyList[i]["relatedKeys"].splice(newKeyList[i]["relatedKeys"].indexOf(whatToDelete), 1);
          break;
        }
      }
      snedUpdatedChatToServer(chatRef.current, newKeyList);
    }
  }

  async function handleEditButton(e) {
    console.log("edit button is calling : ", e.target);
    setContextMenue({
      position: {
        x: 0,
        y: 0
      },
      toggled: false,
    })
    const divElement = editElementRef.current;
    const textArea = document.createElement('textarea');
    textArea.className = "text-area-question";
    const oldQuestion = divElement.innerText;
    textArea.value = oldQuestion;
    textArea.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
      }
    })
    textArea.addEventListener('focusout', (evt) => {
      textArea.parentNode.replaceChild(divElement, textArea);
      if (oldQuestion !== evt.target.value) {
        changeEditedQuestion(oldQuestion, evt.target.value);
      }
    })
    divElement.parentNode.replaceChild(textArea, divElement);
    textArea.focus();
  }

  async function handleRightClick(e, rightClickQuestion) {
    console.log("this is calling : ", rightClickQuestion);
    e.preventDefault();
    let totleWidth = window.innerWidth;
    let x = totleWidth - e.pageX < 125 ? (totleWidth - 125) : e.pageX;
    let y = e.pageY;
    contextMenueRef.current = rightClickQuestion;
    editElementRef.current = e.target;
    setContextMenue({
      position: {
        x,
        y
      },
      toggled: true,
    })
  }
  function removeContextMenue() {
    if (contextMenue.toggled) {
      setContextMenue({
        position: {
          x: 0,
          y: 0
        },
        toggled: false,
      })
    }
  }
  document.addEventListener('click', (e) => {
    removeContextMenue();
  })
  return (
    isloader ? <div className='loaderbody'>
      <div className="loader"></div>
    </div>
      :
      <>
        <div className="optbar">
          <div className="chat-opt" onClick={resetChat} >Reset Chat</div>
          <div className="chat-opt" onClick={resetSampleChat}>Reset Sample Chat</div>
          <div className='showlink'>Your script to add on your application is : https://worlddevelopment.in/chatcreate?user={sessionStorage.getItem('user')}<div className="copylink" onClick={copyText}>Copy</div></div>
          {buttonLoader ? (<div className='buttonloaderbody'>
            <div className="buttonloader"></div>
          </div>
          ) : (<div className='AI-btn' onClick={getAiGenratedChat}>Get AI Data</div>)}
          <div className='logout-btn' onClick={lgoout}>Log Out</div>
        </div>
        <div className='dltedtbtnsec'>
          <div className='dltbtn' onClick={handleDeleteChat}>Delete</div>
          <div className='dltbtn'>Edit</div>
        </div>
        <div className="chat-admin-container">
          {
            (keyList.length < 1 || keyList[0]["relatedKeys"].length === 0) ? <p>Chat Data is not Awailable</p> :
              keyList?.map((obj, index) => {
                return (
                  <div key={`${obj.selectedKey}_${index}`} className="chat-column">
                    {
                      obj.relatedKeys.map((singleKey, index) => {
                        return (
                          obj.selectedKey == singleKey) ?
                          (
                            <div key={index} className="single-row" draggable onDragStart={(e) => onDragStart(e, index)} onDragOver={onDragOver} onDrop={(e) => onDrop(e, index)}>
                              <div onContextMenu={(e) => { handleRightClick(e, singleKey) }} key={`${singleKey}_${index}`} className="single-chat selected" onMouseUp={handleSelection}>{singleKey}</div>
                            </div>
                          ) :
                          (
                            <div key={index} className="single-row" draggable onDragStart={(e) => onDragStart(e, index)} onDragOver={onDragOver} onDrop={(e) => onDrop(e, index)}>
                              <div onContextMenu={(e) => { handleRightClick(e, singleKey) }} key={`${singleKey}_${index}`} className="single-chat" onMouseUp={handleSelection}>{singleKey}</div>
                            </div>
                          )
                      })
                    }
                  </div>
                )
              })
          }
        </div>
        <div className='add-question'>
          <div className="question-icons">
            <button type="button" className="icon-btn">
              <img src="/images/addlink.png" alt="Icon 1" />
            </button>
            <button type="button" className="icon-btn">
              <img src="/images/addpicture.png" alt="Icon 2" />
            </button>
          </div>
          <div className="add-question-area">
            <textarea placeholder='here you can add new question or answere for the selected fields' id='questiontext'></textarea>
            <button onClick={handleAddChat} type="button" className="add-qu-btn">Add</button>
          </div>
        </div>
        <ContextMenue
          positionx={contextMenue.position.x}
          positiony={contextMenue.position.y}
          isToggled={contextMenue.toggled}
          buttons={contextMenueButtons}
          editButtonFunction={handleEditButton}
        />
        <QueryWindow props={chatWindowData} refChatWindowData={chatWindowDataRef} setchatwindowdata={setChatWindowData} funcUpdateUserClientChat={updateUsersClientChats} />
      </>
  )
}
