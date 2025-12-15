import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { GameService, ComponentRefresh } from "gamez";
import GameComponent from "./Game";
import { ASSETS, LEVELS } from "./constants";
import "./styles/globals.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

function App() {
  const createGS = useCallback(() => new GameService("cashier-chaos", LEVELS, ASSETS), []);
  const [gs, setGs] = useState<GameService>(() => createGS());

  // This guarantees: currLevel back to 0, state cleared, listeners fresh, etc.
  const restartFromLevel1 = useCallback(() => {
    setGs(createGS());
  }, [createGS]);

  return (
    <ComponentRefresh>
      <GameComponent gs={gs} onRestartFromLevel1={restartFromLevel1} />
    </ComponentRefresh>
  );
}

root.render(<App />);
