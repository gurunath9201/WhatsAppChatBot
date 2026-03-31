import { useState, useRef, useEffect } from 'react'
import { sendMessage, healthCheck } from '../api/chatbot'
import { Send, User, Bot, AlertCircle, CheckCircle, Loader } from 'lucide-react'

const QUICK_REPLIES = ['Hi', 'Bye', 'How are you?', 'Help', 'Thanks', 'What is your name?']

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: 'bot',
      text: "Welcome to WhatsBot! I am your WhatsApp chatbot simulator. Try saying Hi or Bye!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [input, setInput] = useState('')
  const [sender, setSender] = useState('+91-9876543210')
  const [loading, setLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  const bottomRef = useRef(null)

  useEffect(() => {
    checkBackend()
  }, [])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const checkBackend = async () => {
    try {
      await healthCheck()
      setBackendStatus('online')
    } catch (err) {
      setBackendStatus('offline')
    }
  }

  const handleSend = async (text) => {
    const messageText = (text || input).trim()
    if (!messageText) return

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const payload = {
        from: sender,
        message: messageText,
        timestamp: new Date().toISOString(),
      }

      const res = await sendMessage(payload)
      const data = res.data

      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.reply,
        timestamp: data.timestamp || new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, botMsg])
      setBackendStatus('online')

    } catch (err) {
      setBackendStatus('offline')
      const errMsg = {
        id: Date.now() + 1,
        type: 'error',
        text: 'Could not reach the backend. Make sure Spring Boot is running on port 8080.',
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderStatusPill = () => {
    if (backendStatus === 'online') {
      return (
        <div className="status-pill online">
          <CheckCircle size={13} />
          <span>Connected</span>
        </div>
      )
    }
    if (backendStatus === 'offline') {
      return (
        <div className="status-pill offline">
          <AlertCircle size={13} />
          <span>Offline</span>
        </div>
      )
    }
    return (
      <div className="status-pill checking">
        <Loader size={13} className="spin" />
        <span>Checking...</span>
      </div>
    )
  }

  return (
    <div className="chat-page">

      {/* ── Left Sidebar ── */}
      <aside className="chat-sidebar">

        <div className="sidebar-section">
          <h6 className="sidebar-title">Backend Status</h6>
          {renderStatusPill()}
          <button className="btn-refresh" onClick={checkBackend}>
            &#8635; Check again
          </button>
        </div>

        <div className="sidebar-section">
          <h6 className="sidebar-title">Your Number</h6>
          <input
            className="sidebar-input"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="+91-XXXXXXXXXX"
          />
        </div>

        <div className="sidebar-section">
          <h6 className="sidebar-title">Quick Replies</h6>
          <div className="quick-replies">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                className="quick-btn"
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section api-info">
          <h6 className="sidebar-title">API Endpoint</h6>
          <code className="api-code">POST /webhook</code>
          <pre className="api-sample">
            {JSON.stringify({ from: sender, message: 'Hi', timestamp: '...' }, null, 2)}
          </pre>
        </div>

      </aside>

      {/* ── Right Chat Panel ── */}
      <div className="chat-main">

        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">
            <Bot size={20} />
          </div>
          <div className="chat-header-info">
            <div className="chat-header-name">WhatsBot</div>
            <div className="chat-header-sub">
              {backendStatus === 'online' ? '🟢 Online' : '🔴 Offline'}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={'message-row ' + msg.type}>

              {msg.type === 'bot' && (
                <div className="msg-avatar bot-avatar">
                  <Bot size={14} />
                </div>
              )}

              <div className={'message-bubble ' + msg.type}>
                <p>{msg.text}</p>
                <span className="msg-time">{msg.timestamp}</span>
              </div>

              {msg.type === 'user' && (
                <div className="msg-avatar user-avatar">
                  <User size={14} />
                </div>
              )}

            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="message-row bot">
              <div className="msg-avatar bot-avatar">
                <Bot size={14} />
              </div>
              <div className="message-bubble bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
          >
            {loading
              ? <Loader size={18} className="spin" />
              : <Send size={18} />
            }
          </button>
        </div>

      </div>
    </div>
  )
}

export default ChatPage