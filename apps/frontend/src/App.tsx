import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Items } from "@effect-http-example/api";
import { client } from "./client.js";
import { Effect } from "effect";
import { ClientError } from "effect-http";

function App() {
  const [items, setItems] = useState<Items | undefined>(undefined);
  const [error, setError] = useState<ClientError.ClientError | undefined>(
    undefined,
  );

  useEffect(() => {
    client
      .getItems()
      .pipe(
        Effect.match({ onSuccess: setItems, onFailure: setError }),
        Effect.runPromise,
      );
  }, []);

  return (
    <div>
      {error && <span>Failed with {JSON.stringify(error)}</span>}
      {items && (
        <ul>
          {items.map((item) => (
            <li>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
