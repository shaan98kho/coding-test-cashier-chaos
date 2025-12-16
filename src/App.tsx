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

  const restartFromLevel1 = useCallback(() => {
    setGs(createGS());
  }, [createGS]);

  const goToLevel = useCallback((targetLevelIndex: number) => {
    const newGs = createGS();
    for (let i = 0; i < targetLevelIndex; i++) newGs.nextLevel();
    setGs(newGs);
  }, [createGS]);

  return (
    <ComponentRefresh>
      <GameComponent gs={gs} onRestartFromLevel1={restartFromLevel1} onNextLevel={goToLevel}/>
    </ComponentRefresh>
  );
}

root.render(<App />);
