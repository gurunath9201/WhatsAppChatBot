import { useState, useEffect } from 'react'
import { getLogs, clearLogs } from '../api/chatbot'
import { RefreshCw, Trash2, MessageSquare, Clock, User, Bot, AlertCircle } from 'lucide-react'

function LogsPage() {
  const [logs, setLogs] = useState([])
  const [totalMessages, setTotalMessages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [error, setError] = useState('')
  const [lastFetched, setLastFetched] = useState(null)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getLogs()
      const data = res.data
      setLogs(data.logs || [])
      setTotalMessages(data.totalMessages || 0)
      setLastFetched(new Date().toLocaleTimeString())
    } catch (err) {
      setError('Failed to fetch logs. Make sure Spring Boot is running on port 8080.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    const confirmed = window.confirm('Are you sure you want to clear all logs?')
    if (!confirmed) return

    setClearing(true)
    try {
      await clearLogs()
      setLogs([])
      setTotalMessages(0)
    } catch (err) {
      setError('Failed to clear logs.')
    } finally {
      setClearing(false)
    }
  }

  const getUniqueSenders = () => {
    if (logs.length === 0) return 0
    const unique = new Set(logs.map((l) => l.from))
    return unique.size
  }

  const getLastMessageTime = () => {
    if (logs.length === 0) return '—'
    const last = logs[logs.length - 1]
    if (!last || !last.timestamp) return '—'
    const parts = last.timestamp.split(' ')
    return parts[1] || '—'
  }

  return (
    <div className="logs-page">

      {/* ── Header ── */}
      <div className="logs-header">
        <div className="logs-title-section">
          <h2 className="logs-title">
            <MessageSquare size={22} />
            <span>Message Logs</span>
          </h2>
          {lastFetched && (
            <span className="logs-last-fetched">
              <Clock size={12} />
              <span>Last updated: {lastFetched}</span>
            </span>
          )}
        </div>

        <div className="logs-actions">
          <button
            className="btn-action refresh"
            onClick={fetchLogs}
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            <span>{loading ? 'Loading...' : 'Refresh'}</span>
          </button>

          <button
            className="btn-action clear"
            onClick={handleClear}
            disabled={clearing || logs.length === 0}
          >
            <Trash2 size={15} />
            <span>{clearing ? 'Clearing...' : 'Clear All'}</span>
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{totalMessages}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{getUniqueSenders()}</div>
          <div className="stat-label">Unique Senders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{getLastMessageTime()}</div>
          <div className="stat-label">Last Message</div>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="logs-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* ── Empty State ── */}
      {!loading && !error && logs.length === 0 && (
        <div className="logs-empty">
          <MessageSquare size={48} />
          <p>No messages yet. Go to the Chat tab and send a message!</p>
        </div>
      )}

      {/* ── Table ── */}
      {logs.length > 0 && (
        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <User size={13} />
                  <span>Sender</span>
                </th>
                <th>
                  <MessageSquare size={13} />
                  <span>Incoming Message</span>
                </th>
                <th>
                  <Bot size={13} />
                  <span>Bot Reply</span>
                </th>
                <th>
                  <Clock size={13} />
                  <span>Timestamp</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...logs].reverse().map((log) => (
                <tr key={log.id}>
                  <td className="log-id">{log.id}</td>
                  <td className="log-from">
                    <span className="sender-tag">{log.from}</span>
                  </td>
                  <td className="log-incoming">
                    <span className="incoming-msg">{log.incomingMessage}</span>
                  </td>
                  <td className="log-reply">
                    <span className="reply-msg">{log.botReply}</span>
                  </td>
                  <td className="log-time">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default LogsPage