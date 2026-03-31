package com.whatsappchatbot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatLog {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("from")
    private String from;

    @JsonProperty("incomingMessage")
    private String incomingMessage;

    @JsonProperty("botReply")
    private String botReply;

    @JsonProperty("timestamp")
    private String timestamp;

    public ChatLog() {}

    public ChatLog(Long id, String from, String incomingMessage,
                   String botReply, String timestamp) {
        this.id              = id;
        this.from            = from;
        this.incomingMessage = incomingMessage;
        this.botReply        = botReply;
        this.timestamp       = timestamp;
    }

    public Long   getId()              { return id; }
    public String getFrom()            { return from; }
    public String getIncomingMessage() { return incomingMessage; }
    public String getBotReply()        { return botReply; }
    public String getTimestamp()       { return timestamp; }

    public void setId(Long id)                         { this.id              = id; }
    public void setFrom(String from)                   { this.from            = from; }
    public void setIncomingMessage(String incoming)    { this.incomingMessage = incoming; }
    public void setBotReply(String botReply)           { this.botReply        = botReply; }
    public void setTimestamp(String timestamp)         { this.timestamp       = timestamp; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long   id;
        private String from;
        private String incomingMessage;
        private String botReply;
        private String timestamp;

        public Builder id(Long id)                         { this.id              = id;              return this; }
        public Builder from(String from)                   { this.from            = from;            return this; }
        public Builder incomingMessage(String incoming)    { this.incomingMessage = incoming;        return this; }
        public Builder botReply(String botReply)           { this.botReply        = botReply;        return this; }
        public Builder timestamp(String timestamp)         { this.timestamp       = timestamp;       return this; }

        public ChatLog build() {
            return new ChatLog(id, from, incomingMessage, botReply, timestamp);
        }
    }

    @Override
    public String toString() {
        return "ChatLog{" +
               "id="                 + id              +
               ", from='"            + from            + '\'' +
               ", incomingMessage='" + incomingMessage + '\'' +
               ", botReply='"        + botReply        + '\'' +
               ", timestamp='"       + timestamp       + '\'' +
               '}';
    }
}