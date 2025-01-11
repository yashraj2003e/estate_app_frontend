import { useState } from "react";
import "./chat.scss";
import { useAuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useAuthContext();

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, receiver });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const text = formData.get("text");

      if (!text) return;

      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>

        {chats.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              background: c.seenBy.includes(currentUser.id)
                ? "white"
                : "yellow",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((msg) => (
              <div
                className="chatMessage"
                key={msg.id}
                style={{
                  alignSelf:
                    msg.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: msg.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{msg.text}</p>
                <span>{format(msg.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
