import { createContext, useRef } from "react";

export const ChatWindowContext = createContext(null);

export default function ChatWindowProvider({ children }) {
  const chatWindowDivRef = useRef(null);

  return (
    <ChatWindowContext.Provider value={chatWindowDivRef}>
      {children}
    </ChatWindowContext.Provider>
  );
};