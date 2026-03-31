import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const sendMessage = (payload) =>
  api.post('/webhook', payload)

export const getLogs = () =>
  api.get('/webhook/logs')

export const clearLogs = () =>
  api.delete('/webhook/logs')

export const healthCheck = () =>
  api.get('/webhook/health')

export default api