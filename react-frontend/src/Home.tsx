import { useState } from "react";
import { trpc } from "./trpc";

export default function Home() {
  const deckQuery = trpc.decks.all.useQuery();
  const deckCreator = trpc.decks.create.useMutation();
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {deckQuery.data?.map((deck) => (
          <div key={deck.id}>
            <h2>{deck.name}</h2>
            <h3>{deck.description}</h3>
          </div>
        ))}
      </div>
      <div className="card">
        <button
          onClick={async () => {
            await deckCreator.mutateAsync({
              name: "new deck",
              description: "Something new",
            });
            deckQuery.refetch();
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}
