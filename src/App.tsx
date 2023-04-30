import {BlurFilter, TextStyle} from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';

export const MyComponent = () =>
{
    const blurFilter = useMemo(() => new BlurFilter(0.5), []);

    return (
        <Stage>
            <Sprite
                image="https://pixijs.io/pixi-react/img/bunny.png"
                x={400}
                y={270}
                anchor={{ x: 0.5, y: 0.5 }}
            />

            <Container x={400} y={330}>
                <Text
                    text="Hello World"
                    anchor={{ x: 0.5, y: 0.5 }}
                    filters={[blurFilter]}
                    style={
                        new TextStyle({
                            align: 'center',
                            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                            fontSize: 24,
                            fill: '#ffffff',
                        })
                    }
                />
            </Container>
        </Stage>
    );
};

export default MyComponent