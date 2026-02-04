import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  KeyboardControls,
  PointerLockControls,
  Stats,
} from "@react-three/drei";
import { Scene } from "../Scene.tsx";
import { MobileControls } from "./MobileControls.tsx";
import { useMyStore } from "../store/store.ts";
import { PauseMenu } from "./ui/PauseMenu.tsx";

export const World = () => {
  const isMobile = useMyStore((state) => state.isMobile);
  const status = useMyStore((state) => state.status);
  const pause = useMyStore((state) => state.pause);
  const resume = useMyStore((state) => state.resume);

  const handleUnlock = () => {
    if (status === "playing") {
      pause();
    }
  };

  const handleLock = () => {
    resume();
  };

  return (
    <>
      {status === "paused" && <PauseMenu />}
      <div className="flex h-screen w-screen">
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "pause", keys: ["Escape"] },
          ]}
        >
          {isMobile && status === "playing" && <MobileControls />}
          <Canvas
            gl={{ antialias: false }}
            dpr={1}
            camera={{
              position: [0, 1.5, 0],
              rotation: [0, 0, 0],
            }}
          >
            <Scene />
            {!isMobile && (
              <PointerLockControls
                selector="#playButton"
                onUnlock={handleUnlock}
                onLock={handleLock}
              />
            )}
            {isMobile && <CameraControls smoothTime={0} />}
          </Canvas>
        </KeyboardControls>
        <Stats />
      </div>
    </>
  );
};
