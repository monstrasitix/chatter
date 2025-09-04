import { randomUUID } from "@/utils/random";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props extends PropsWithChildren {}

export type AuditToken =
  | { id: string; type: "headline"; message: string }
  | { id: string; type: "subhead"; message: string }
  | { id: string; type: "body"; message: string };

export type AuditInfo =
  | { id: string; type: "user"; message: string }
  | { id: string; type: "ai"; tokens: AuditToken[] };

export interface Conversation {
  id: string;
  name: string;
  company?: string;
  problem?: string;
  solution?: string;
  audit: AuditInfo[];
  tone?: string;
}

interface ConversationContext {
  list: Conversation[];
  updateAudit: (id: string, audit: AuditInfo) => void;
  addConversation: (name: string) => Conversation;
  addConversationWithAudit: (name: string, audit: AuditInfo) => Conversation;
}

const ConversationContext = createContext<ConversationContext>({
  list: [],
  updateAudit: () => {},
  addConversation: () => ({ id: "", audit: [], name: "name" }),
  addConversationWithAudit: () => ({ id: "", audit: [], name: "name" }),
});

export function useSingleConversation(id?: string): Conversation | undefined {
  const { list } = useContext(ConversationContext);

  return list.find((item) => item.id === id);
}

export function useAudit(): ConversationContext["updateAudit"] {
  const { updateAudit } = useContext(ConversationContext);

  return updateAudit;
}

export function useConversations(): Pick<
  ConversationContext,
  "list" | "addConversation" | "addConversationWithAudit"
> {
  const { list, addConversation, addConversationWithAudit } =
    useContext(ConversationContext);
  return { list, addConversation, addConversationWithAudit };
}

function createConversation(name: string): Conversation {
  return {
    id: randomUUID(),
    name,
    audit: [],
  };
}

export function ConversationProvider({ children }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const addConversation = (name: string): Conversation => {
    const newItem = createConversation(name);

    setConversations((list) => {
      return [newItem, ...list];
    });

    return newItem;
  };

  const addConversationWithAudit = (
    name: string,
    audit: AuditInfo
  ): Conversation => {
    const newItem = createConversation(name);

    setConversations((list) => {
      return [{ ...newItem, audit: [audit] }, ...list];
    });

    return newItem;
  };

  const updateAudit = (id: string, audit: AuditInfo) => {
    setConversations((list) => {
      return list.map((item) => {
        if (item.id === id) {
          return { ...item, audit: [...item.audit, audit] };
        }
        return item;
      });
    });
  };

  return (
    <ConversationContext.Provider
      children={children}
      value={{
        list: conversations,
        updateAudit,
        addConversation,
        addConversationWithAudit,
      }}
    />
  );
}
