import { createContext, useRef } from "react";

export const ChatWindowContext = createContext(null);

export default function ChatWindowProvider({ children }) {
  const chatWindowDivRef = useRef(null);
  const inviteUserRef = useRef(null);
  const memberListRef = useRef(null);

  return (
    <ChatWindowContext.Provider value={{ chatWindowDivRef, inviteUserRef, memberListRef }}>
      {children}
    </ChatWindowContext.Provider>
  );
};