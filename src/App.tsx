import {useEffect, useRef, useState} from 'react';
import {Sprite, Stage} from '@pixi/react';
import * as PIXI from 'pixi.js';
import timeMapUrl from './assets/pixelholes-overworld-tileset-demo.png' // https://pixelhole.itch.io/pixelholes-overworld-tileset

const calculateScale = () => {
    const imageWidth = 1872 // 图片宽度;
    const imageHeight = 1248 // 图片高度;

    const scaleX = window.innerWidth / imageWidth;
    const scaleY = window.innerHeight / imageHeight;

    const scale = Math.min(scaleX, scaleY);

    const x = (window.innerWidth - imageWidth * scale) / 2;
    const y = (window.innerHeight - imageHeight * scale) / 2;

    return { x, y, scale };
};


const BackgroundMap = () => {
    const appRef = useRef<PIXI.Application | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const rendererOptions = {
        width: window.innerWidth,
        height: window.innerHeight,
        // backgroundColor: 0xffffff,
        resolution: window.devicePixelRatio || 1,
        autoResize: true,
    };

    useEffect(() => {
        const app = appRef.current;
        if (!app) {
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
    }, [appRef])

    return (
        <Stage
            options={rendererOptions}
            onMount={(app) => {
                appRef.current = app;
            }}
        >
            <Sprite
                texture={PIXI.Texture.from(timeMapUrl)}
                x={position.x}
                y={position.y}
                scale={new PIXI.Point(scale, scale)}
            />
        </Stage>
    );
};

export default BackgroundMap