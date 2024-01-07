import {Rect, RectProps, Txt, TxtProps} from "@motion-canvas/2d";

import {colors} from "../colors";
import {createRef, Reference} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";

export type HighlightedRefProps = {
    setContent: (s: string) => any,
}

export function HighlightedText({ ref }: {ref: Reference<HighlightedRefProps>}) {
    const rootRef = createRef<Rect>()
    const element = <Rect width="100%" height={100} layout direction="column" ref={rootRef} justifyContent="center" alignItems="center">
            <Container opacity={0}>
                <BaseText>H1</BaseText>
            </Container>
    </Rect>

    ref({
        setContent: function* (s: string) {
            const parts = s.split('*')
            rootRef().add(
                <Container opacity={0}>
                    {parts.map((part, k) => <Rect>
                        {part.split(' ').map((word, i) => <>
                            {i > 0 && <Rect width={30}></Rect>}
                            <BaseText fill={k % 2 === 1 ? colors.yellow : colors.textLight}>{word}</BaseText>
                        </>)}
                    </Rect>)}
                </Container>);
            yield* all(
                rootRef().children().at(0).opacity(0, 1),
                rootRef().children().at(-1).opacity(1, 1)
            )
            rootRef().children().at(0).remove()
            rootRef().children().at(0).position([0, 0])
        }
    })

    return element
}

const Container = (props: RectProps) => {
    return <Rect
        layout
        justifyContent="center"
        alignItems="center"
        height={0}
        width="100%"
        {...props}>
    </Rect>
}

const BaseText = (props: TxtProps) => {
    return <Txt
        textAlign="center"
        fontSize={60}
        fill={colors.textLight}
        fontFamily={'"JetBrains Mono", monospace'}
        {...props}
    />
}

