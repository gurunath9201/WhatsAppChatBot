package com.whatsappchatbot.service;

import com.whatsappchatbot.model.ChatLog;
import com.whatsappchatbot.model.MessageRequest;
import com.whatsappchatbot.model.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ChatbotService {

    private static final Logger logger =
            LoggerFactory.getLogger(ChatbotService.class);

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final List<ChatLog> chatLogs =
            Collections.synchronizedList(new ArrayList<>());

    private final AtomicLong idCounter = new AtomicLong(1);
    public MessageResponse processMessage(MessageRequest request) {

        String incoming  = request.getMessage().trim();
        String timestamp = LocalDateTime.now().format(FORMATTER);

        logger.info("Incoming message from [{}]: \"{}\" at {}",
                    request.getFrom(), incoming, timestamp);

        String reply = generateReply(incoming);

        logger.info("Bot reply to [{}]: \"{}\"", request.getFrom(), reply);

        ChatLog log = ChatLog.builder()
                .id(idCounter.getAndIncrement())
                .from(request.getFrom())
                .incomingMessage(incoming)
                .botReply(reply)
                .timestamp(timestamp)
                .build();

        chatLogs.add(log);

        return MessageResponse.builder()
                .status("success")
                .from(request.getFrom())
                .originalMessage(incoming)
                .reply(reply)
                .timestamp(timestamp)
                .build();
    }

    public List<ChatLog> getAllLogs() {
        return Collections.unmodifiableList(chatLogs);
    }

    public void clearLogs() {
        chatLogs.clear();
        idCounter.set(1);
        logger.info("All chat logs cleared.");
    }

    private String generateReply(String message) {

        String lower = message.toLowerCase().trim();

        if (lower.equals("hi") || lower.equals("hello") || lower.equals("hey")) {
            return "Hello! How can I help you today?";

        } else if (lower.equals("bye") || lower.equals("goodbye") || lower.equals("see you")) {
            return "Goodbye! Have a wonderful day!";

        } else if (lower.contains("how are you")) {
            return "I'm doing great, thanks for asking! How can I assist you?";

        } else if (lower.contains("help")) {
            return "Sure! I can help you. Please describe your issue and I'll do my best.";

        } else if (lower.contains("thank") || lower.contains("thanks")) {
            return "You're welcome! Feel free to reach out anytime.";

        } else if (lower.contains("name")) {
            return "I'm WhatsBot — your friendly WhatsApp assistant!";

        } else if (lower.contains("time") || lower.contains("date")) {
            return "The current server time is: " + LocalDateTime.now().format(FORMATTER);

        } else {
            return "I received your message: \"" + message +
                   "\". I'm still learning! Try saying Hi or Bye.";
        }
    }
}