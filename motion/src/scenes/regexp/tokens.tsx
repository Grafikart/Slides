import {Txt, Node, Rect, TxtProps} from "@motion-canvas/2d";
import {CodeBlock, insert, remove, edit} from '@motion-canvas/2d/lib/components/CodeBlock';
import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {createRef} from "@motion-canvas/core/lib/utils";
import {waitUntil} from "@motion-canvas/core";
import {colors} from "../../colors";
import {HighlightedRefProps, HighlightedText} from "../../components/HighlightedText";
import {all} from "@motion-canvas/core/lib/flow";

const duration = 1;
const fontSize = 80;

export default makeScene2D(function* (view) {
    view.fill(colors.bg)

    console.log(colors)

    const codeRef = createRef<CodeBlock>()
    const rectRef = createRef<Rect>()
    const highlightRef = createRef<HighlightedRefProps>()

    yield view.add(
        <>
            <Rect layout direction="column" width="90%" height="90%">
                <Txt
                    marginBottom={40}
                    fontSize={30}
                    fontWeight={700}
                    fill={'rgba(255,255,255,0.75)'}
                    fontFamily={'"JetBrains Mono", monospace'}
                >
                    Symboles
                </Txt>
                <Rect height="100%" width="100%" alignItems="center" direction="column" justifyContent="center" gap={100}>
                    <CodeBlock ref={codeRef} fontSize={fontSize} language="regexp" code="aze" />,
                    <HighlightedText ref={highlightRef} />
                </Rect>
            </Rect>
        </>
    )


    yield* waitUntil('delimiter')
    yield* codeRef().edit(duration, false)`${insert(`//`)}`;
    yield* waitUntil('word')
    yield* codeRef().edit(duration, false)`/${insert(`tente`)}/`;
    yield* waitUntil('wordchange')
    yield* highlightRef().setContent('Je suis avec ma *tente*')
    yield* waitUntil('hword')
    yield* codeRef().edit(duration, false)`/t${edit(`e`, `[ea]`)}nte/`;
    yield* waitUntil('hcaracter')
    yield* highlightRef().setContent('Je suis avec ma *tante*')

    // Range
    yield* waitUntil('hrange')
    yield* codeRef().edit(duration, false)`/t[${edit(`ea`, `a-z`)}]nte/`;
    yield* waitUntil('hrange_example')
    yield* highlightRef().setContent('Je suis avec ma *tonte*')

    // Range+
    yield* waitUntil('range+')
    yield* codeRef().edit(duration, false)`/${remove("t")}[a-z${insert(`0-9`)}]${remove("nte")}/`;
    yield* highlightRef().setContent('J*e* suis avec ma tante')
    yield* waitUntil('casse')
    yield* all(
     codeRef().edit(duration, false)`/[${insert(`A-Z`)}a-z0-9]/`,
     highlightRef().setContent('*J*e suis avec ma tante')
    )

    yield* waitUntil('dot')
    yield* codeRef().edit(duration, false)`/${edit("[A-Za-z0-9]", ".")}/`

    yield* waitUntil('number')
    yield* all(
        codeRef().edit(duration, false)`/${edit(".", "\\d")}/`,
        highlightRef().setContent("J'ai *2*5 ans")
    )

    yield* waitUntil('w')
    yield* all(
        codeRef().edit(duration, false)`/${edit("\\d", "\\w")}/`,
        highlightRef().setContent("*J*'ai 10 ans")
    )

    // yield* (rectRef().children()[1] as Txt).fill('red', duration);
    // yield* (rectRef().children()[1] as Txt).fill('blue', duration);
})

const BaseText = (props: TxtProps) => {
    return <Txt
        textAlign="center"
        marginBottom={40}
        fontSize={60}
        fill={'rgba(217,217,217,0.6)'}
         fontFamily={'"JetBrains Mono", monospace'}
        {...props}
    />
}
