import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextShare';
import { getUser, getMessagesAPI, getChatPreviewAPI } from '../../services/allApis';
import UserAvatar from '../../components/avatar/UserAvatar';
import updateSession from '../../services/updateSession';
import { Send, ArrowLeft, Users, MessageSquare } from 'lucide-react';
import './chatWindow.css';

function ChatWindow() {
  const { selectedReceiverId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [receiverId, setReceiverId] = useState(selectedReceiverId || '');
  const [receiverData, setReceiverData] = useState(null);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch receiver data
  const fetchReceiver = useCallback(async () => {
    if (!receiverId) return;
    try {
      const res = await getUser(receiverId);
      setReceiverData(res.data?.user || res.data);
    } catch (err) { /* silent */ }
  }, [receiverId]);

  // Fetch chat history
  const fetchChats = useCallback(async () => {
    if (!user?._id || !receiverId) return;
    try {
      const res = await getMessagesAPI(user._id, receiverId);
      setChats(res.data?.messages || res.data || []);
    } catch (err) { /* silent */ }
    finally { setLoading(false); }
  }, [user?._id, receiverId]);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    if (!user?._id) return;
    try {
      const res = await getChatPreviewAPI(user._id);
      setContacts(res.data?.contacts || res.data || []);
    } catch (err) { /* silent */ }
  }, [user?._id]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);
  useEffect(() => { fetchReceiver(); fetchChats(); }, [fetchReceiver, fetchChats]);
  useEffect(() => { scrollToBottom(); }, [chats]);

  // Socket listener
  useEffect(() => {
    const handleIncomingMessage = (chat) => {
      if (chat.senderId === receiverId || chat.receiverId === receiverId ||
          chat.senderId === user?._id || chat.receiverId === user?._id) {
        setChats(prev => [...prev, chat]);
      }
    };

    window.socket?.on('chat message', handleIncomingMessage);
    return () => { window.socket?.off('chat message', handleIncomingMessage); };
  }, [receiverId, user?._id]);

  const sendMessage = () => {
    if (!message.trim() || !user?._id || !receiverData?._id) return;

    const isContacted = user?.contactedUsers?.includes(receiverData._id);
    const chatPayload = {
      senderId: user._id,
      receiverId: receiverData._id,
      text: message.trim(),
      isContacted
    };

    window.socket?.emit('chat message', chatPayload);

    if (!isContacted) {
      updateSession(user._id);
      fetchContacts();
    }

    setMessage('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const selectContact = (id) => {
    setReceiverId(id);
    setLoading(true);
    setChats([]);
    navigate(`/user/chats/${id}`, { replace: true });
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <aside className={`chat-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 style={{ fontSize: 'var(--text-base)', margin: 0, fontWeight: 600 }}>Messages</h3>
        </div>
        <div className="contacts-list">
          {contacts.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
              <Users size={32} style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }} />
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', margin: 0 }}>No conversations yet</p>
            </div>
          ) : contacts.map((contact) => (
            <div key={contact._id} className={`contact-item ${contact._id === receiverId ? 'active' : ''}`}
              onClick={() => selectContact(contact._id)}>
              <UserAvatar userData={contact} heightxwidth={2.5} fontSize="12px" />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 500, margin: 0, fontSize: 'var(--text-sm)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {contact.firstname} {contact.lastname}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>@{contact.username}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <div className="chat-main">
        {/* Chat Header */}
        <div className="chat-header">
          <button className="btn-icon mobile-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <ArrowLeft size={18} /> : <MessageSquare size={18} />}
          </button>
          {receiverData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <UserAvatar userData={receiverData} heightxwidth={2.2} fontSize="11px" />
              <div>
                <p style={{ fontWeight: 600, margin: 0, fontSize: 'var(--text-sm)' }}>{receiverData.firstname} {receiverData.lastname}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                  {receiverData.isOnline ? '● Online' : 'Offline'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="messages-container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-10)' }}>
              <div className="spinner-lg"></div>
            </div>
          ) : chats.length === 0 ? (
            <div className="empty-state" style={{ padding: 'var(--space-16) 0' }}>
              <MessageSquare size={40} className="empty-state-icon" />
              <h3 className="empty-state-title">Start a conversation</h3>
              <p className="empty-state-text">Send your first message to begin chatting</p>
            </div>
          ) : (
            chats.map((chat, i) => {
              const isSender = chat.senderId === user?._id;
              return (
                <div key={i} className={`message-row ${isSender ? 'sent' : 'received'}`}>
                  {!isSender && <UserAvatar userData={receiverData} heightxwidth={1.8} fontSize="10px" />}
                  <div className={`message-bubble ${isSender ? 'sent' : 'received'}`}>
                    <p style={{ margin: 0 }}>{chat.text}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {receiverData && (
          <div className="chat-input-bar">
            <input
              ref={inputRef}
              className="input-custom"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ flex: 1 }}
            />
            <button className="btn-primary-custom" onClick={sendMessage} disabled={!message.trim()}>
              <Send size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
