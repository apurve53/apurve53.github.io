import React, { useEffect, useRef, useState } from 'react'
function QueryWindow({ props, refChatWindowData, setchatwindowdata }) {
    const chatWindowsData = props;
    const [hideORshow, setHideOrShow] = useState('Show');
    const containerHeightRef = useRef('20px');
    const containerMaxWidthRef = useRef('auto');
    const chatWindowDisplay = useRef('none');
    const chatWindowsStyles = {
        containerStyle: {
            width: '100%',
            maxWidth: containerMaxWidthRef.current,
            minWidth: 'auto',
            height: containerHeightRef.current,
            minHeight: containerHeightRef.current,
            position: 'fixed',
            bottom: '1px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '5px',
            boxShadow: "#38d45fbe 0px 0px 16px -1px",
        },
        hideShowButton: {
            alignSelf: 'end',
            cursor: 'n-resize',
            margin: '-3px 10px -3px -3px',
            boxShadow: "#38d45fbe 0px 0px 16px -1px",
        },
        chatWindowsHolder: {
            minWidth: '100%',
            display: chatWindowDisplay.current,
            borderRadius: '10px',
            minHeight: '100%',
            overflowX: 'scroll',
            overflowAnchor: 'auto',
            columnGap: '10px',
        },
        chatWindow: {
            minWidth: '20%',
            // width: "20vw",
            height: "100%",
            border: "1px solid #ccc",
            display: chatWindowDisplay.current,
            flexDirection: "column",
            boxShadow: "-2px -10px 6px rgba(0, 0, 0, 1)",
        },
        chatHeader: {
            backgroundColor: "#0078d4",
            color: "#fff",
            padding: "8px",
            textAlign: "center",
            fontWeight: "bold",
            display: 'flex',
            position: 'relative',
        },

        chatCross: {
            position: 'absolute',
            right: '10px',
            color: 'black',
            cursor: 'pointer',
        },
        chatContent: {
            flexGrow: 1,
            overflowY: "auto",
            padding: "10px",
            backgroundColor: "#f9f9f9",
        },
        chatMessage: {
            marginBottom: "5px",
        },
        chatInput: {
            display: "flex",
            padding: "5px",
            borderTop: "1px solid #ccc",
            backgroundColor: "#fff",
        },
        chatInputField: {
            flexGrow: 1,
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
        chatInputButton: {
            marginLeft: "5px",
            padding: "5px 10px",
            backgroundColor: "#0078d4",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
        },
        chatInputButtonHover: {
            backgroundColor: "#005ea1",
        },
    };

    function toggleChat() {
        containerMaxWidthRef.current = containerMaxWidthRef.current === '100%' ? 'auto' : '100%';
        containerHeightRef.current = containerHeightRef.current === '50%' ? '20px' : '50%';
        chatWindowDisplay.current = chatWindowDisplay.current === 'flex' ? 'none' : 'flex';
        setHideOrShow(hideORshow === 'Hide' ? 'Show' : 'Hide');
    }
    async function handleSend(evt) {
        let msgFrom = evt.target.id;
        let typedMesg = document.getElementById(`$${evt.target.id}typed`).value;
        let response = await fetch('http://worlddevelopment.in/update_users_client_chat', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ 'user': sessionStorage.getItem('user'), 'to': evt.target.id, 'chat': typedMesg }),
            credentials: 'include',
        });
        if (response.ok) {
            let tempData = JSON.parse(JSON.stringify(refChatWindowData.current));
            let updated = false;
            for (let i = 0; i < tempData.length; i++) {
                if (tempData[i].from === msgFrom) {
                    tempData[i].chat.push({ 'to': msgFrom, 'chat': typedMesg });
                    updated = true;
                    break;
                }
            }
            if (updated) {
                refChatWindowData.current = tempData;
                setchatwindowdata(tempData);
            } else {
                refChatWindowData.current.current.push({ 'user': sessionStorage.getItem('user'), 'from': msgFrom, 'isOnline': 'green', 'chat': [{ 'from': msgFrom, 'chat': typedMesg }] });
                setchatwindowdata(JSON.parse(JSON.stringify(refChatWindowData.current)));
            }
        }
        document.getElementById(`$${evt.target.id}typed`).value = "";
    }
    async function removeClientSupportWindow(evt) {
        const parentElement = evt.currentTarget.parentNode;
        const userID = parentElement.firstChild.nodeValue.trim();
        let response = await fetch('http://worlddevelopment.in/remove_users_client_chat', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ 'from': userID }),
            credentials: 'include',
        });
        if (response.ok) {
            let tempData = JSON.parse(JSON.stringify(refChatWindowData.current));
            for (let i = 0; i < tempData.length; i++) {
                if (tempData[i].from === userID) {
                    tempData.splice(i, 1);
                    break;
                }
            }
            refChatWindowData.current = tempData;
            setchatwindowdata(tempData);
        }//Here I can get 404 status, need to know if still response.ok conditon comes true if true then need to handle that with 404 status code
    }
    return (
        <div style={chatWindowsStyles.containerStyle}>
            <div className='hide-show-btn' style={chatWindowsStyles.hideShowButton} onClick={toggleChat}>{hideORshow}</div>
            <div style={chatWindowsStyles.chatWindowsHolder}>
                {chatWindowsData?.map((obj, index) => {
                    return (
                        <div key={index} style={chatWindowsStyles.chatWindow}>

                            <div style={chatWindowsStyles.chatHeader}>
                                {obj.from}
                                <div style={{ border: `1px solid ${obj.isOnline}`, borderRadius: '50%', backgroundColor: obj.isOnline, width: '10px', height: '10px' }}></div>
                                <div onClick={(evt) => { removeClientSupportWindow(evt) }} style={chatWindowsStyles.chatCross}>X</div>
                            </div>
                            <div style={chatWindowsStyles.chatContent}>
                                <div style={chatWindowsStyles.chatMessage}>{obj.chat.map((chatObj, indexe) => {
                                    return (
                                        <span key={indexe}>
                                            {chatObj.from ? 'User' : 'Me'} : {chatObj.chat} <br />
                                        </span>
                                    )
                                })}</div>
                            </div>
                            <div style={chatWindowsStyles.chatInput}>
                                <textarea
                                    name="chatarea"
                                    style={chatWindowsStyles.chatInputField}
                                    placeholder="Type a message..."
                                    id={`$${obj.from}typed`}
                                />
                                <button
                                    onClick={(evt) => { handleSend(evt) }}
                                    id={obj.from}
                                    style={chatWindowsStyles.chatInputButton}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = chatWindowsStyles.chatInputButtonHover.backgroundColor)}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = chatWindowsStyles.chatInputButton.backgroundColor)}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}

export default QueryWindow;