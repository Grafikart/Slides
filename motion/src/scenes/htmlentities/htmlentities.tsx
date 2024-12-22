import {Node, Path, Rect, Shape, Txt, makeScene2D, Code, LezerHighlighter} from "@motion-canvas/2d";
import { colors } from "../colors.js"
import { all, createRef, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const path = createRef<Path>();
    const layout = createRef<Rect>();
    const width = view.width()
    const tag = createRef<Txt>()
    view.fill(colors.bgAlpha)
    view.add(<>
    <Rect layout width="100%" ref={layout} alignItems="center" height={300}>
        <Node position={[600, 10]}>
            <Txt ref={tag} fill={colors.text} lineHeight={300} fontSize={400} textAlign="center" width="40%" fontFamily="monospace">{"<"}</Txt>
        </Node>
        <Node position={[200, 0]}>
            <Path width="20%"
                ref={path}
                lineWidth={14}
                stroke={colors.yellow}
                data="M0,0L350,0"
                endArrow
                start={0}
                end={0}
                x={width * -.08}
                />
        </Node>
        <Node position={[-200, 0]} opacity={0}>
            <Txt fill={colors.text} lineHeight={300} fontSize={150} textAlign="center" width="40%" fontFamily="monospace">{"&lt;"}</Txt>
        </Node>
    </Rect>
    </>)

    const children = layout().peekChildren() as Shape[]
    yield* waitUntil('delimiter')
    yield *all(
        children[0].position([125, 0], .7),
        children[1].position([0, 0], .7),
        tag().fill(colors.textLight, .7),
        path().end(1, .7),
        children[2].position([-50, 0], .7),
        children[2].opacity(1, .7),
    )
    yield* waitUntil('end')
})
