import { useMemo } from "react";
import { SplatMesh } from "@sparkjsdev/spark";
import { useMyStore } from "../store/store";

export const Splat = () => {
  const sceneUrl = useMyStore((state) => state.sceneUrl);

  const splat = useMemo(() => {
    if (!sceneUrl) return null;

    console.log("Loading splat from:", sceneUrl);
    const splatMesh = new SplatMesh({
      url: sceneUrl,
    });
    return splatMesh;
  }, [sceneUrl]);

  if (!splat) return null;

  return (
    <>
      <primitive object={splat} />
    </>
  );
};