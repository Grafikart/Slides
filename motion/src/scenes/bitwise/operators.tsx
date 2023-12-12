import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {CodeBlock, edit, insert, remove} from "@motion-canvas/2d/lib/components/CodeBlock";
import {createRef} from "@motion-canvas/core/lib/utils";
import {Layout, Line, Rect} from "@motion-canvas/2d";
import {all, waitFor} from "@motion-canvas/core/lib/flow";
import {createSignal, waitUntil} from "@motion-canvas/core";
import {addBinary} from "../../components/binary";
import {slideDown, slideUpAndClear} from "../../components/transition";

const duration = 1;
const fontSize = 80

export default makeScene2D(function* (view) {

    view.fill('#161720')
    const codeRef = createRef<CodeBlock>()
    const bitRef = createRef<CodeBlock>()
    const rectRef = createRef<Rect>()

    yield view.add(
        <Rect layout direction={'column'} alignItems={"center"} justifyContent={"center"}>
            <CodeBlock fontSize={fontSize} ref={codeRef} language="ts" code={`const LOG     = 1 << 0;
const ERROR   = 1 << 1;
const INFO    = 1 << 2;
const WARN    = 1 << 3;

const flag = LOG`}/>
            <CodeBlock fontSize={fontSize} ref={bitRef} language="ts" code={``}/>
            <Rect ref={rectRef} direction="column"></Rect>
        </Rect>
    )

    yield* waitUntil('Shift')

    yield* codeRef().edit(duration * 2, false)`${remove(`const LOG     = 1 << 0;
const ERROR   = 1 << 1;
const INFO    = `)}1 << 2${remove(`;
const WARN    = 1 << 3;

const flag = LOG`)}`;


    const text = createSignal('1')
    yield* addBinary(rectRef(), {name: text, value: "1"}, 1, 0)

    const lineRef = createRef<Line>()
    const number1 = rectRef().children()[0].children()[4]
    const first0 = rectRef().children()[0].children()[2]
    const from = number1.position().addY(-20)
    const to = createSignal(from)
    view.add(
        <Line
            ref={lineRef}
            lineWidth={6}
            stroke={'lightseagreen'}
            endArrow
            points={[from, to]}
        />,
    );

    const number1AbsolutePosition = number1.children()[0].absolutePosition()
    yield* all(
        to(first0.position().addY(-20), duration),
        number1.children()[0].absolutePosition(first0.children()[0].absolutePosition(), duration),
        text("1 << 2", duration * 0.5),
        (function* y() {
            yield* first0.children()[0].opacity(0, duration * 0.5)
            first0.children()[0].absolutePosition(number1AbsolutePosition)
            yield* first0.children()[0].opacity(1, duration * 0.5)
        })()
    )

    yield* lineRef().opacity(0, duration)
    lineRef().remove()

    yield* waitFor(1)

    yield * all(
        slideUpAndClear(rectRef().children()[0] as Layout),
        addBinary(rectRef(), {name: "LOG", value: "001"}, 1, 0),
        addBinary(rectRef(), {name: "ERROR", value: "010"}, 1, 0),
        addBinary(rectRef(), {name: "INFO", value: "100"}, 1, 0),
        addBinary(rectRef(), {name: "WARN", value: "1000"}, 1, 0)
    )

    yield* waitFor(1)

    yield* all(
        slideUpAndClear(rectRef()),
        codeRef().edit(duration * 2, false)`${insert(`const LOG     = 1 << 0;
const ERROR   = 1 << 1;
const INFO    = `)}1 << 2${insert(`;
const WARN    = 1 << 3;

const flag = LOG`)}`
    )

    yield* waitFor(1)

    yield* codeRef().edit(duration, false)`const LOG     = 1 << 0;
const ERROR   = 1 << 1;
const INFO    = 1 << 2;
const WARN    = 1 << 3;

const flag = LOG${insert(' | INFO')}`;

    yield* codeRef().edit(duration * 2, false)`${remove(`const LOG     = 1 << 0;
const ERROR   = 1 << 1;
const INFO    = 1 << 2;
const WARN    = 1 << 3;

const flag = `)}LOG | INFO`;


    yield * addBinary(rectRef(), {name: "LOG", value: "1"})

    yield * addBinary(rectRef(), {name: "INFO", value: "100"})

    yield * slideDown(rectRef())

    yield * addBinary(rectRef(), {name: "OR", value: "101"}, 1)

    yield* waitFor(1)

    yield* slideUpAndClear(rectRef())

    yield* waitFor(1)

    yield* codeRef().edit(duration * 2, false)`${insert(`const flag = `)}LOG | INFO`;
    yield* waitFor(1)
    yield* codeRef().edit(duration * 1.3, false)`${edit(`const `, `if (`)}flag${edit(` = LOG | INFO`, ` & INFO) { }`)}`;
    yield* addBinary(rectRef(), {name: "flag", value: "101"})
    yield* addBinary(rectRef(), {name: "INFO", value: "100"})
    yield* slideDown(rectRef())
    yield* addBinary(rectRef(), {name: "AND", value: "100"}, duration)
    yield* slideUpAndClear(rectRef())

    yield* waitFor(1)

    yield* codeRef().edit(duration * 1.3, false)`if (flag & ${edit(`INFO`, `WARN`)}) { }`;
    yield* addBinary(rectRef(), {name: "flag", value: "101"})
    yield* addBinary(rectRef(), {name: "WARN", value: "1000"})
    yield* slideDown(rectRef())
    yield* addBinary(rectRef(), {name: "AND", value: "0000"}, duration)
    yield* slideUpAndClear(rectRef())

    yield* waitFor(1)

    yield* codeRef().edit(duration, false)`${remove(`if (`)}flag${edit(` & WARN) { }`, ` &= ~INFO`)}`;
    yield* addBinary(rectRef(), {name: "INFO", value: "100"})
    yield* slideDown(rectRef())
    yield* addBinary(rectRef(), {name: "~", value: "1011"}, duration)
    yield* addBinary(rectRef(), {name: "flag", value: "101"}, duration, 0)
    yield* (rectRef().children()[0] as Layout).opacity(0.3, duration)
    yield* addBinary(rectRef(), {name: "AND", value: "1"}, duration)
    yield* slideUpAndClear(rectRef())

    yield* codeRef().edit(duration, false)`flag${edit(` &= ~INFO`, ` = LOG`)}`;
    yield* waitFor(1)
});
