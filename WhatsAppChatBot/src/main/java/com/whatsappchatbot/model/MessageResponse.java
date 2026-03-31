package com.whatsappchatbot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MessageResponse {

    @JsonProperty("status")
    private String status;

    @JsonProperty("from")
    private String from;

    @JsonProperty("originalMessage")
    private String originalMessage;

    @JsonProperty("reply")
    private String reply;

    @JsonProperty("timestamp")
    private String timestamp;

    public MessageResponse() {}

    public MessageResponse(String status, String from, String originalMessage,
                           String reply, String timestamp) {
        this.status          = status;
        this.from            = from;
        this.originalMessage = originalMessage;
        this.reply           = reply;
        this.timestamp       = timestamp;
    }

    public String getStatus()          { return status; }
    public String getFrom()            { return from; }
    public String getOriginalMessage() { return originalMessage; }
    public String getReply()           { return reply; }
    public String getTimestamp()       { return timestamp; }

    public void setStatus(String status)                   { this.status          = status; }
    public void setFrom(String from)                       { this.from            = from; }
    public void setOriginalMessage(String originalMessage) { this.originalMessage = originalMessage; }
    public void setReply(String reply)                     { this.reply           = reply; }
    public void setTimestamp(String timestamp)             { this.timestamp       = timestamp; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String status;
        private String from;
        private String originalMessage;
        private String reply;
        private String timestamp;

        public Builder status(String status)                   { this.status          = status;          return this; }
        public Builder from(String from)                       { this.from            = from;            return this; }
        public Builder originalMessage(String originalMessage) { this.originalMessage = originalMessage; return this; }
        public Builder reply(String reply)                     { this.reply           = reply;           return this; }
        public Builder timestamp(String timestamp)             { this.timestamp       = timestamp;       return this; }

        public MessageResponse build() {
            return new MessageResponse(status, from, originalMessage, reply, timestamp);
        }
    }

    @Override
    public String toString() {
        return "MessageResponse{" +
               "status='"          + status          + '\'' +
               ", from='"          + from            + '\'' +
               ", originalMessage='"+ originalMessage + '\'' +
               ", reply='"         + reply           + '\'' +
               ", timestamp='"     + timestamp       + '\'' +
               '}';
    }
}