import { useState } from 'react';
import { Stage } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { useMap } from "./component/map.tsx"; // https://pixelhole.itch.io/pixelholes-overworld-tileset

const BackgroundMap = () => {
    const [app, setApp] = useState<PIXI.Application | null>(null);

    const rendererOptions = {
        width: window.innerWidth,
        height: window.innerHeight,
        // backgroundColor: 0xffffff,
        resolution: window.devicePixelRatio || 1,
        autoResize: true,
    };

    const mapSprite = useMap(app)

    return (
      <Stage
        options={rendererOptions}
        onMount={(app) => {
            setApp(app);
        }}
      >
          {mapSprite}
      </Stage>
    );
};

export default BackgroundMap
