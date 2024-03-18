import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import './chatWindow.css'
import InputText from './InputText';
import socketIOClient, { io } from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import { useLocation, useParams } from 'react-router-dom';
import { getUser } from '../../services/allApis';
import UserAvatar from '../../components/avatar/UserAvatar';
import { getMessages } from './chatApi';
import { createRoot } from 'react-dom/client';
import ChatMemo from './ChatMemo';
import ChatSidebar from './ChatSidebar';
import { useDispatch } from 'react-redux';
import updateSession from '../../services/updateSession';
import Header from '../../components/header/Header';


function ChatWindow() {

    const { selectedReceiverId } = useParams();

    const dispatch = useDispatch()

    /* For token */
    // const [token, setToken] = useState("")
    // const socketio = socketIOClient("http://localhost:4000");

    // const URL = "http://localhost:4000";
    // const socketio = io(URL, { autoConnect: false });

    // const [socketio, setSocketio] = useState(null);

    const [chats , setChats] = useState([])

    const [userData, setUserData] = useState([])

    const [receiverId , setReceiverId] = useState("")

    const [receiverData, setReceiverData] = useState([])

    const containerRef = useRef(null);

    const messagesEndRef = useRef(null)

    const [isContacted, setIsContacted] = useState()

    // const [currentChat, setCurrentChat] = 

    const [open, setOpen] = useState(true); /* state to keep the side chat panel open or not */

    /* State to store the navbar height and to useit across the app */
    const [navHeight, setNavheight] = useState("")

    /* setting loading data manulally */
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [loadingReceiverData, setLoadingReceiverData] = useState(true);
    const [loadingChatsData, setLoadingChatsData] = useState(true);

    console.log("navHeightnavHeightnavHeightnavHeight ", navHeight);
    console.log("socket id sabed in window.socket", window.socket);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    const setReceiver = ()=>{

        if(selectedReceiverId){ /* if a receiver id is present from the params then set it as the receiver */
            setReceiverId(selectedReceiverId)
        }
    }

    const getCurrentUser = ()=>{
        try {

            if (sessionStorage.getItem("loggedInUser")){
                const currentUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
                setUserData(currentUser)
                console.log("Got Current user", currentUser);
            }
            
        } catch (error) {
            console.error('Error fetching other data:', error);
        } finally {
            setLoadingUserData(false);
        }
        

    }

    const getReceiverData = async()=>{

        try {

            const token = sessionStorage.getItem("token")
            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }
            }

            //   console.log(" token", token, userId);

            const response = await getUser( receiverId, reqHeader)
            console.log("while setReceiverData sended setReceiverData", response.data);
            setReceiverData(response.data)
 
        } catch (error) {
            console.error('Error fetching other data:', error);
        } finally {
            setLoadingReceiverData(false);
        }
    }

    const setUserContacted = ()=>{

        /* this is to know that tghe the the receiver of the message is already been contacted or not */
        const isContacted = userData?.contactedUsers?.includes(receiverData?._id);
        console.log("iscontacted setting" , isContacted);
        setIsContacted(isContacted)
    }

    const getAllChats = async()=>{

        try {

            const token = sessionStorage.getItem("token")
            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` /* send token back as authorization */
                }
            }
          
            const response = await getMessages(userData?._id, receiverData?._id, reqHeader)/* 'sender' and 'Receiver' ids */
            setChats(response.data)

            console.log("response of all messages", response.data);
            
        } catch (error) {
            console.error('Error fetching other data:', error);
        } finally {
            setLoadingChatsData(false);
        }
    }

      useEffect(() => {
        scrollToBottom()
      }, [chats])

      useEffect(() => {
        setReceiver()
      }, [])

      useEffect(()=>{
        getCurrentUser()
        getReceiverData()
      },[receiverId])

      useEffect(()=>{
        setUserContacted()
      }, [userData, receiverData])

      useEffect(()=>{
        // getReceiverData()
        getAllChats()
        
      }, [receiverData])
          
        useEffect(() => {
            const createNewElement = (chat) => {

                if (receiverId === chat.receiverId || receiverId === chat.senderId) { /* To sow messages of what chat I currently open. If the incoming message
                doesnt match with the current opened chat then not to display it.
                And two conditions are checked because incoming message can may be a message that i have sent so checking the senderId */
                    console.log("inside the create && userDatauserData", userData, receiverData);
                    // console.log("receiver createNewElement chat", chat);
            
                    // Create a new HTML div element
                    const newElement = document.createElement('div');

            
                    // Render the ParentComponent inside the new div
                    createRoot(newElement).render(<ChatMemo chat={chat} userData={userData} receiverData={receiverData} />);
            
                    // Append the new div (with ParentComponent) to the container div
                    containerRef.current.appendChild(newElement);
                    scrollToBottom()
                } else {
                    /* Have to Write proper else condition to handle this . like adding a notification symbol to notify
                    users that you got a new chat 
                        */
                }

                
            }   
            
            
            window.socket?.on('chat message', createNewElement);

            return () => {
                // Cleanup function
                window.socket?.off('chat message', createNewElement);
            };
        }, [userData, window.socket, receiverData]); /* the createNewElement function. When createNewElement is defined,
                                                        it captures the value of receiverData from the surrounding scope.
                                                        This means that even if receiverData changes later on, 
                                                        the createNewElement function still holds a reference 
                                                        to the initial value of receiverData when
                                                        it was first defined.
                                                        -----
                                                        By including receiverData in the dependency array, 
                                                        the createNewElement function will be redefined whenever 
                                                        receiverData changes, ensuring that it captures the latest value 
                                                        of receiverData. This should resolve the issue you're facing 
                                                    */

    function sendChatToSocket(chat){
        console.log("sending chat ...");
        window.socket?.emit("chat message" , chat)

        /* while sending the message if it is a noncontacted persons message the above emit will update it in the user data
         but to let the frontend session know we have to fetch from backend and store the new session*/
        if(!isContacted){

            const token = sessionStorage.getItem("token")
            if(token){
                /* create request header */
                var reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                console.log("inside the !isContacted", reqHeader);
                updateSession(userData._id)
                // dispatch(getUserData(userData._id, reqHeader))
            }
        }
    }

    console.log("while id sended receiver", receiverData);

    function addMessage(chat){

        /* adding to state userdata also because it gets data from the session ony from the */
        const newChat = {
            senderId: userData._id, 
            receiverId: receiverData._id, 
            text: chat.message,
            isContacted   
        };
                
        sendChatToSocket(newChat)
    }

    // Individual Chat Component
    // function ChatItem({ index, chat, userData, receiverData }) {
    //     return (
    //         <>
    //             {
    //                 chat.senderId === userData._id ?(
    //                     <ChatBoxSender key={index} message={chat?.text} userData={userData} />
    //                 ): (
    //                     <ChatBoxReciever key={index} message={chat?.text} userData={receiverData} />
    //                 )
    //             }
    //         </>
    //     );
    // }
  

    function ChatsList(){
        
        return(<div className='mt-4' ref={containerRef}>
            
              {
                 chats?.map((chat, index) => {
                  if(chat?.senderId === userData._id) return <ChatBoxSender key={index} message={chat?.text} userData={userData} />
                  return <ChatBoxReciever key={index} message={chat?.text} userData={receiverData} />
              })
              }
            </div>
            
        )
    }

        

  return (
    <React.Fragment>

        <Header setNavheight={setNavheight} isFromChats={true} />

        <Container fluid className='mx-auto'> {/* style={{ height: `calc(100vh - ${navHeight}px)` }} */}
            {
                loadingUserData || loadingReceiverData || loadingChatsData ? (
                    <div className='d-flex justify-content-center align-items-center' style={{height: '60vh'}}> 
                        <div style={{width: '10em', height: '10em'}}>
                            <Spinner animation="border" variant="primary" className='me-4 w-100 h-100'/>
                            <p className='fs-1'>Loading...</p>
                        </div>
                    </div>
                  ) : (

                    <div className='pb-5 px-3 position-relative' style={{ paddingTop: `calc( ${navHeight}px)` }}>
                        {/* the side bar that shows all the chat list */}
                        {
                            userData && (
                                <ChatSidebar userId={userData?._id} isContacted={isContacted} isOpen={open} setReceiverId={setReceiverId} /> /* sending iscontacted tate to update the request if any value changes on isContacted */
                            )
                        }
                        

                        <div className='position-relative' style={{ marginLeft: open?'400px':'', flex:'1', transition: 'all 0.35s ease-in-out', backgroundColor: '#fdfdfd'}}> {/* Chat Setion */}

                            <div className='p-2 d-flex justify-content-start align-items-center bg-primary-subtle position-fixed z-3' style={{width: open?'calc(100% - 430px)':'100%', transition: 'all 0.35s ease-in-out'}}>
                                <div className='p-2 rounded bg-warning h-100' style={{cursor: 'pointer'}} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >

                                    {
                                        open?
                                        <i className="fa-solid fa-angles-left text-white fs-6"></i>:

                                        <i className="fa-solid fa-angles-right text-white fs-6"></i>

                                    }

                                </div>

                                <UserAvatar userData={receiverData} heightxwidth={3} fontSize={'1rem'}/>
                                <h4 className='ms-2'>{receiverData?.username}</h4>
                            </div>   
    
                            <div id='chatbox' className='mt-4 pt-4'>
                                <ChatsList />
                            </div>
                            <div className='imhere p-2' style={{height: '100px'}} ref={messagesEndRef} />
                            <InputText addMessage={addMessage} open={open}/>
                        </div>
                    </div>
                  )
                
            }
        </Container>
    </React.Fragment>
  )
}

export default ChatWindow
