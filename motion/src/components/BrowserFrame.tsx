import type {ComponentChildren} from "@motion-canvas/2d";
import {Txt, Node, Rect, TxtProps, Circle, Img, SVG, Path} from "@motion-canvas/2d";
import {colors} from "../colors";
import {Length} from "@motion-canvas/2d/src/lib/partials";
import BackButton from './img/BackButton.svg'
import Burger from './img/Burger.svg'

type Props = {
    children: ComponentChildren
    address: ComponentChildren
    width: Length,
    height: Length
}

export const BrowserFrame = ({children, width, height, address}: Props) => {
    return <Rect
        gap={10}
        layout
        direction="column"
        fill={colors.bgLight}
        radius={10}
        justifyContent="stretch"
        alignItems="stretch"
        width={width}
        height={height}
        padding={10}
    >
        <Rect gap={10}>
            <Circle
                position={[0, 100]}
                width={20}
                height={20}
                fill={colors.purple}
            />
            <Circle
                position={[0, 100]}
                width={20}
                height={20}
                fill={colors.yellow}
            />
            <Circle
                position={[0, 100]}
                width={20}
                height={20}
                fill={colors.green}
            />
        </Rect>
        <Rect gap={20} padding={[0, 10]} alignItems="center">
            <Img
                src={BackButton}
                width={30}
                height={30}
            />
            <Img
                src={BackButton}
                width={30}
                height={30}
                rotation={180}
            />
            <Rect padding={[10, 20]} fill={colors.bg} radius={10} width="100%">
                {address}
            </Rect>
                <Img
                    src={Burger}
                    width={30}
                    height={30}
                    rotation={180}
                />
        </Rect>
        <Rect radius={5} layout fill={colors.bg} direction="column" width="100%" height="100%" alignItems="center"
              justifyContent="center">
            {children}
        </Rect>
    </Rect>
}
