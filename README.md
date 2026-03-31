# WhatsBot — WhatsApp Chatbot Simulator
 
A full-stack WhatsApp chatbot backend simulation built with **Java Spring Boot** (backend) and **React + Vite + Bootstrap** (frontend).
 
---
 
## Project Structure
 
```
whatsapp-bot/
├── backend/                          # Spring Boot REST API
│   ├── src/main/java/com/chatbot/
│   │   ├── WhatsAppChatbotApplication.java   # Entry point
│   │   ├── controller/
│   │   │   └── WebhookController.java        # REST endpoints
│   │   ├── service/
│   │   │   └── ChatbotService.java           # Reply logic + logging
│   │   ├── model/
│   │   │   ├── MessageRequest.java           # Incoming message DTO
│   │   │   ├── MessageResponse.java          # Bot reply DTO
│   │   │   └── ChatLog.java                  # Log entry model
│   │   └── config/
│   │       └── CorsConfig.java               # CORS configuration
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                         # React + Vite UI
    ├── src/
    │   ├── App.jsx
    │   ├── api/chatbot.js            # Axios API calls
    │   ├── components/Navbar.jsx
    │   ├── pages/
    │   │   ├── ChatPage.jsx          # Chat simulation UI
    │   │   └── LogsPage.jsx          # Message logs viewer
    │   └── styles/App.css
    └── vite.config.js

## Running Locally
 
### Prerequisites
- Java 21
- Maven 3.8
 
### Step 1 — Start the Spring Boot Backend
 
```bash
cd backend
mvn spring-boot:run
```
 
Backend starts at → **http://localhost:8080**
 
---
 
### Step 2 — Start the React Frontend
 
```bash
cd frontend
npm install
npm run dev
```
 
Frontend starts at → **http://localhost:5173**
 
---
 
## API Endpoints
 
### `POST /webhook`
Receive and process a simulated WhatsApp message.
 
**Request Body:**
```json
{
  "from": "+91-9876543210",
  "message": "Hi",
  "timestamp": "2024-03-01T10:00:00"
}
```
 
**Response:**
```json
{
  "status": "success",
  "from": "+91-9876543210",
  "originalMessage": "Hi",
  "reply": "Hello! How can I help you today?",
  "timestamp": "2024-03-01 10:00:00"
}
```
 
---
 
### `GET /webhook/logs`
Returns all logged incoming messages and bot replies.
 
### `GET /webhook/health`
Health check — returns `{ "status": "UP" }`.
 
### `DELETE /webhook/logs`
Clears all stored message logs.
 
---
 
## Predefined Reply Logic
 
| Input              | Bot Reply                                        |
|--------------------|--------------------------------------------------|
| hi / hello / hey   | Hello! How can I help you today?                 |
| bye / goodbye      | Goodbye! Have a wonderful day!                   |
| how are you        | I'm doing great, thanks for asking!              |
| help               | Sure! I can help you...                          |
| thanks / thank you | You're welcome!                                  |
| name               | I'm WhatsBot — your friendly assistant!          |
| time / date        | Current server time                              |
| anything else      | Fallback with echoed message                     |
 
---
 
## Testing with curl
 
```bash
# Send a message
curl -X POST http://localhost:8080/webhook \
  -H "Content-Type: application/json" \
  -d '{"from":"+91-9876543210","message":"Hi","timestamp":"2024-03-01T10:00:00"}'
 
# View logs
curl http://localhost:8080/webhook/logs
 
# Health check
curl http://localhost:8080/webhook/health
 
# Clear logs
curl -X DELETE http://localhost:8080/webhook/logs
```
 
---
 
## ☁️ Deploying on Render (Free)
 
### Backend (Spring Boot)
1. Push the `backend/` folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Build command: `mvn clean package -DskipTests`
5. Start command: `java -jar target/whatsapp-chatbot-1.0.0.jar`
6. Set environment: Java 17
 
### Frontend (React)
1. Push the `frontend/` folder to GitHub
2. New → Static Site on Render
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Update `src/api/chatbot.js` → set `BASE_URL` to your Render backend URL
 
---
 
## 🛠 Tech Stack
 
| Layer    | Technology                    |
|----------|-------------------------------|
| Backend  | Java 21, Spring Boot 4.0.0    |
| API      | REST, JSON, Spring Web        |
| Frontend | React 18, Vite, Bootstrap 5   |
| Styling  | CSS Variables, Custom Tokens  |
| HTTP     | Axios                         |
| Icons    | Lucide React                  |
| Logging  | SLF4J + Logback               |
 
## Created By - Gurunath Someshwar Mule
