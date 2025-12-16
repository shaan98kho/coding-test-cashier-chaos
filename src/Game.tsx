import { CenterLoading, GameServiceProps, GameServiceWrapper } from "gamez";
import { useEffect, useState } from "react";
import { CashierChaos, emptyCash } from "./CashierChaos";
import { Instructions } from "./components/Instructions";
import ErrorBoundary from "./ErrorBoundary";

type EndReason = "success" | "error" | "timeout";

let isInstructionsShownAlready = false;

function EndOverlay({
  reason,
  onRestart,
  onHome,
  onNextLevel,
  onRestartLevel
}: {
  reason: EndReason,
  onRestart: () => void,
  onHome: () => void,
  onNextLevel: () => void,
  onRestartLevel: () => void,
}) {
  const title =
    reason === "success" ? "Level cleared!" : reason === "timeout" ? "Time’s up!" : "Game Over!";

  return (
    <div className="absolute inset-0 z-[999] grid place-items-center bg-black/60">
      <div className="w-[min(520px,90vw)] rounded-2xl bg-zinc-900 p-6 text-white shadow-2xl">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-white/80">
          {reason === "success"
            ? "Ready to go again from Level 1?"
            : "You can restart from Level 1 or go back to home."}
        </p>

        <div className="mt-6 flex gap-3 justify-end">
          <button className="rounded-xl bg-zinc-700 px-4 py-2 font-semibold" onClick={onHome}>
            Home
          </button>
          {reason === "success" && (
            <button className="rounded-xl bg-green-600 px-4 py-2 font-semibold" onClick={onNextLevel}>
              Go to next level
            </button>
          )}
          {(reason === "timeout" || reason === "error") && (
            <button className="rounded-xl bg-green-600 px-4 py-2 font-semibold" onClick={onRestartLevel}>
              Restart this level
            </button>
          )}
          <button className="rounded-xl bg-green-600 px-4 py-2 font-semibold" onClick={onRestart}>
            Restart from level 1
          </button>          
        </div>
      </div>
    </div>
  );
}

function GameComponent({ 
  gs, 
  onRestartFromLevel1,
  onNextLevel,
}: GameServiceProps & { 
  onRestartFromLevel1: () => void,
  onNextLevel: (nextLevelIndex: number) => void,
}) {
  const [isGameReady, setIsGameReady] = useState(false);
  const [showInstructions, setShowInstruction] = useState(!isInstructionsShownAlready);
  const [endReason, setEndReason] = useState<EndReason | null>(null);

  useEffect(() => {
    setIsGameReady(false);

    // wait for assets to be loaded
    gs.preloadAssets()
      .then(() => {
        gs.initState({
          cash: emptyCash(),
          customer: 1,
          remainingLives: 3,
        });

        gs.startSession();

        gs.addSessionEndListner((result) => {
          // do something when the session ends (e.g., display results, save data)
          const report = gs.collectReport({
            level: gs.getCurrLevel(),
            result,
          });

          gs.saveReport(report);
          setEndReason(result as EndReason);
        });

        setIsGameReady(true);
      })
      .catch((e) => {
        // handle asset loading error
        console.log(e)
      });

    return () => {
      // reset the game when component unmounts
      gs.resetSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gs]);

  const restartFromLvl1 = () => {
    setEndReason(null);
    setIsGameReady(false);  
    onRestartFromLevel1();
  };

  const goHome = () => {
    setEndReason(null);
    
    setShowInstruction(true);
    isInstructionsShownAlready = false;
  };

  const goNextLevel = () => {
    setEndReason(null);
    onNextLevel(gs.getCurrLevel() + 1);
  };

  const restartThisLevel = () => {
    setEndReason(null);
    onNextLevel(gs.getCurrLevel());
  };

  if (showInstructions) {
    return <Instructions onStart={() => (setShowInstruction(false), (isInstructionsShownAlready = true))} />;
  } else if (!isGameReady) {
    return <CenterLoading />;
  } else if (gs.isGameComplete()) {
    return <h1>Game Over!</h1>;
  }

  return <ErrorBoundary fallback={<h2>Failed to load CashierChaos game. Please try again.</h2>}>
        <div className="relative h-full">

          <GameServiceWrapper gs={gs}>
            <CashierChaos />
          </GameServiceWrapper>

          {endReason && <EndOverlay reason={endReason} onRestart={restartFromLvl1} onHome={goHome} onNextLevel={goNextLevel} onRestartLevel={restartThisLevel}/>}
        </div>

        </ErrorBoundary>
}

// whatever you do just make sure you export this
export default GameComponent;
