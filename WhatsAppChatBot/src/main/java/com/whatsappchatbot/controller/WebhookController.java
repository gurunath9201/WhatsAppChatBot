package com.whatsappchatbot.controller;

import com.whatsappchatbot.model.ChatLog;
import com.whatsappchatbot.model.MessageRequest;
import com.whatsappchatbot.model.MessageResponse;
import com.whatsappchatbot.service.ChatbotService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/webhook")
@CrossOrigin(origins = "*")
public class WebhookController {

    private static final Logger logger =
            LoggerFactory.getLogger(WebhookController.class);

    private final ChatbotService chatbotService;

    public WebhookController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> receiveMessage(
            @Valid @RequestBody MessageRequest request) {

        logger.info("POST /webhook  →  from: {}", request.getFrom());

        MessageResponse response = chatbotService.processMessage(request);

        logger.info("Reply sent to [{}]: {}", request.getFrom(), response.getReply());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/logs")
    public ResponseEntity<Map<String, Object>> getLogs() {

        List<ChatLog> logs = chatbotService.getAllLogs();

        Map<String, Object> result = new HashMap<>();
        result.put("totalMessages", logs.size());
        result.put("logs", logs);

        logger.info("GET /webhook/logs  →  {} records", logs.size());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {

        Map<String, String> health = new HashMap<>();
        health.put("status",  "UP");
        health.put("service", "WhatsApp Chatbot Backend");
        health.put("version", "1.0.0");

        return ResponseEntity.ok(health);
    }

    @DeleteMapping("/logs")
    public ResponseEntity<Map<String, String>> clearLogs() {

        chatbotService.clearLogs();

        Map<String, String> result = new HashMap<>();
        result.put("status",  "success");
        result.put("message", "All logs cleared successfully.");

        logger.info("DELETE /webhook/logs  →  logs cleared");

        return ResponseEntity.ok(result);
    }
}