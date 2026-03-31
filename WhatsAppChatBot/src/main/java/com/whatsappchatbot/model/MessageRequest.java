package com.whatsappchatbot.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public class MessageRequest {

    @NotBlank(message = "Sender cannot be blank")
    @JsonProperty("from")
    private String from;

    @NotBlank(message = "Message cannot be blank")
    @JsonProperty("message")
    private String message;

    @JsonProperty("timestamp")
    private String timestamp;

    public MessageRequest() {}

    public MessageRequest(String from, String message, String timestamp) {
        this.from      = from;
        this.message   = message;
        this.timestamp = timestamp;
    }

    public String getFrom()      { return from; }
    public String getMessage()   { return message; }
    public String getTimestamp() { return timestamp; }

    public void setFrom(String from)           { this.from      = from; }
    public void setMessage(String message)     { this.message   = message; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    @Override
    public String toString() {
        return "MessageRequest{" +
               "from='"      + from      + '\'' +
               ", message='" + message   + '\'' +
               ", timestamp='" + timestamp + '\'' +
               '}';
    }
}