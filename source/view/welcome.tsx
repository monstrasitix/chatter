import { useAudit, useConversations } from "@/hooks/conversations";
import { randomUUID } from "@/utils/random";
import { getRandomTokens } from "@/utils/random-tokens";
import { useNavigate } from "react-router";

const welcomes = [
  "Spot the biggest red flags in my pitch",
  "Rewrite my story so it lands with investors",
  "Help me nail my expansion funding ask",
  "Turn my early traction into a fundable deck",
];

export default function Welcome() {
  const navigate = useNavigate();
  const { addConversationWithAudit } = useConversations();
  const updateAudit = useAudit();

  const handleAdd = (message: string) => {
    const item = addConversationWithAudit(message, {
      id: randomUUID(),
      type: "user",
      message,
    });

    updateAudit(item.id, {
      id: randomUUID(),
      type: "ai",
      tokens: getRandomTokens(),
    });
    navigate(`/conversation/${item.id}`);
  };

  return (
    <div className="container -small">
      <header className="jumbotron">
        <div className="jumbotron-section">
          <h1 className="jumbotron-header">Pitch Narrative Builder</h1>

          <p className="jumbotron-paragraph">
            Proceed by creating a new room or raising suggested conversation.
          </p>
        </div>

        <div className="jumbotron-section">
          <div className="grid -columns-2 -gap-2">
            {welcomes.map((welcome) => {
              return (
                <button
                  onClick={() => handleAdd(welcome)}
                  key={welcome}
                  type="button"
                  className="button -secondary"
                >
                  {welcome}
                </button>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}
