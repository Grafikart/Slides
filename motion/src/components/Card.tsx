import {Rect, Txt} from "@motion-canvas/2d/lib/components";
import {RectProps} from "@motion-canvas/2d";

export function Card ({ref, children, title}: RectProps & {title: string}) {
    return <Rect layout direction="column">
        <Txt
            marginBottom={40}
            fontSize={40}
            fontWeight={700}
            fill={'#fff'}
            fontFamily={'"JetBrains Mono", monospace'}
        >{title}</Txt>
        <Rect
        ref={ref}
        width={'100%'}
        height={'100%'}
        fill={'#2d2e3b'}
        direction={"column"}
        alignItems={'start'}
        padding={50}
        grow={1}
        radius={30}
        justifyContent={'start'}
    >
        {children}
    </Rect>
    </Rect>
}
