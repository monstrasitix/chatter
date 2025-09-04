import { clsx } from "clsx";
import { lazy } from "react";
import { useParams } from "react-router";

import { RenderToken } from "@/component/render-token";

import { useSingleConversation } from "@/hooks/conversations";

const Prompt = lazy(() => import("@/view/prompt"));

export default function Conversation() {
  const params = useParams<"conversation">();

  const conversation = useSingleConversation(params.conversation);

  if (conversation === undefined) {
    return (
      <div className="container -medium">
        <div className="jumbotron">
          <div className="jumbotron-section">
            <h1 className="jumbotron-header">Not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="conversations">
      <div className="conversations-dialogue">
        <div className="container -medium">
          <div className="dialogue">
            {conversation.audit.length ? (
              conversation.audit.map((audit) => {
                return (
                  <div
                    key={audit.id}
                    className={clsx("dialogue-item", {
                      "-user": audit.type === "user",
                      "-ai": audit.type === "ai",
                    })}
                  >
                    {audit.type === "user" && audit.message}
                    {audit.type === "ai" && (
                      <RenderToken tokens={audit.tokens} />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="jumbotron">
                <div className="jumbotron-section">
                  <h1 className="jumbotron-header">Start a conversation</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="conversations-prompt">
        <Prompt conversation={conversation} />
      </div>
    </div>
  );
}
