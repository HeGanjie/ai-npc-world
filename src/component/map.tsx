import * as PIXI from "pixi.js";
import { useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import timeMapUrl from "../assets/pixelholes-overworld-tileset-demo.png";

const calculateScale = () => {
  const imageWidth = 1872 // 图片宽度;
  const imageHeight = 1248 // 图片高度;

  const scaleX = window.innerWidth / imageWidth;
  const scaleY = window.innerHeight / imageHeight;

  const scale = Math.min(scaleX, scaleY);

  const x = (window.innerWidth - imageWidth * scale) / 2;
  const y = (window.innerHeight - imageHeight * scale) / 2;

  return {x, y, scale};
};

export function useMap(app: PIXI.Application | null) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    if (!app || !app.renderer) {
      return
    }
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // 更新缩放比例
    const {x, y, scale} = calculateScale();
    setScale(scale);
    setPosition({x, y});

    // 添加窗口调整大小的事件监听器
    const handleResize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);

      // 更新缩放比例
      const {x, y, scale} = calculateScale();
      setScale(scale);
      setPosition({x, y});
    };
    window.addEventListener('resize', handleResize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [app])

  return !app ? null : (
    <Sprite
      texture={PIXI.Texture.from(timeMapUrl)}
      x={position.x}
      y={position.y}
      scale={new PIXI.Point(scale, scale)}
    />
  )
}
