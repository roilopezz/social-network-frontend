import "./message.css";
import { format } from "timeago.js";
import { useRef, useEffect } from "react";

export default function Message({ message, own, src }) {
  const scrollRef = useRef();

  // ---------scroll to bottom in the chat------------ //

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      // block: "end",
      // behavior: "smooth",
    });
  }, []);

  return (
    <div ref={scrollRef}>
      {!message.text ? null : (
        <div key={message._id} className={own ? "message own" : "message"}>
          <span className="messageBottom pb-2">
            {format(message.createdAt)}
          </span>
          <span
            style={{ fontSize: "10px", fontWeight: "bold" }}
            className="pb-2  text-primary messageUserName"
          >{`${message.name} ${message.lastName}`}</span>

          <span className="messageTop">
            <img src={src} className="messageImg" alt="user chat" />
            <p className="messageText">{message.text}</p>
          </span>
        </div>
      )}
    </div>
  );
}
