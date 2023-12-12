import {Node, Rect, RectProps, Txt} from "@motion-canvas/2d";
import {createRef, Reference} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";

const fontSize = 80

type Props = { name: string | Reference<string>, value: string }

const size = 150

/**
 * Créer une ligne représentant un nombre binaire
 */
export function* addBinary(view: Node, {name, value}: Props, duration = 0, numberDuration: number = undefined) {
    const bits = value.padStart(4, '0').split('')
    const rectRef = createRef<Rect>()
    numberDuration = numberDuration ?? duration

    view.add(<Rect layout height={0} opacity={0} ref={rectRef}>
        <Cell width={size + 60} paddingLeft={20}>
            <Txt textAlign="center" fill="#779EF1" fontSize={60} text={name}/>
        </Cell>
        {bits.map((bit, k) => (
            <Cell key={k.toString()}>
                <Node opacity={numberDuration ? 0 : 1} y={numberDuration ? size * -0.3 : 1}>
                    <Txt fill="white"fontSize={fontSize} >{bit}</Txt>
                </Node>
            </Cell>
        ))}
    </Rect>)

    yield * all(
        rectRef().opacity(1, duration),
        rectRef().height(size, duration)
    )

    for (const child of rectRef().children().slice(1).reverse()) {
        const txt = child.children()[0]
        yield * all(
            txt.opacity(1, numberDuration ?? duration),
            txt.position.y(0, numberDuration ?? duration)
        )
    }
}

const Cell = (props: RectProps) => {
    return <Rect lineWidth={1} stroke="white" alignItems="center" justifyContent="center" width={size} height={size} {...props}/>
}
