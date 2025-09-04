import { useEffect, useState } from "react";

import { AuditToken } from "@/hooks/conversations";

export interface Props {
  tokens: AuditToken[];
}

function RenderOne({ token }: { token: AuditToken }) {
  switch (token.type) {
    case "headline":
      return <h2>{token.message}</h2>;

    case "subhead":
      return <h3>{token.message}</h3>;

    default:
      return <p>{token.message}</p>;
  }
}

export function RenderToken({ tokens }: Props) {
  const [currentToken, setCurrentToken] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (currentToken < tokens.length && tokens[currentToken]) {
      const message = tokens[currentToken].message;
      if (index < message.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + message[index]);
          setIndex((prev) => prev + 1);
        }, 5);

        return () => clearTimeout(timeout);
      } else {
        const pause = setTimeout(() => {
          setCurrentToken((prev) => prev + 1);
          setDisplayedText("");
          setIndex(0);
        }, 100);

        return () => clearTimeout(pause);
      }
    }
  }, [index, currentToken, tokens.length]);

  return (
    <>
      {tokens.slice(0, currentToken).map((token) => {
        return <RenderOne key={token.id} token={token} />;
      })}

      {currentToken < tokens.length && (
        <RenderOne
          token={{
            id: "",
            message: displayedText,
            type: tokens[currentToken]?.type ?? "body",
          }}
        />
      )}
    </>
  );
}
