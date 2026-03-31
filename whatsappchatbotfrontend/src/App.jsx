import { useState } from 'react'
import ChatPage from './pages/ChatPage'
import LogsPage from './pages/LogsPage'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('chat')

  return (
    <div className="app-wrapper">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {activePage === 'chat' ? <ChatPage /> : <LogsPage />}
      </main>
    </div>
  )
}

export default App