import {Rect, signal, Txt} from "@motion-canvas/2d";
import {CodeBlock, edit, insert} from '@motion-canvas/2d/lib/components/CodeBlock';
import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {createRef} from "@motion-canvas/core/lib/utils";
import {chain, createSignal, waitUntil} from "@motion-canvas/core";
import {colors} from "../../colors";
import {BrowserFrame} from "../../components/BrowserFrame";
import {all} from "@motion-canvas/core/lib/flow";

const duration = 1;

export default makeScene2D(function* (view) {
    view.fill(colors.bg)
    const codeRef = createRef<CodeBlock>()
    const urlParamRef = createRef<Txt>()

    yield view.add(
        <BrowserFrame
            width="90%"
            height="90%"
            address={<>
                <Txt
                    lineHeight={30}
                    fontSize={30}
                    fill={colors.textLight}
                    fontFamily={'"JetBrains Mono", monospace'}
                >
                    https://grafikart.fr/tutoriels/
                </Txt>
                <Txt
                    ref={urlParamRef}
                    lineHeight={30}
                    fontSize={30}
                    opacity={0}
                    fontWeight={700}
                    fill={colors.yellow}
                    fontFamily={'"JetBrains Mono", monospace'}
                >
                    [id]
                </Txt>
            </>}
        >
            <Rect layout direction="column" width="90%" height="90%" alignItems="center" justifyContent="center">
                <CodeBlock
                    opacity={0}
                    ref={codeRef}
                    fontSize={48}
                    language="javascript"
                    code={`"SELECT * FROM recipes WHERE id = " + id`}/>,
            </Rect>
        </BrowserFrame>
    )
    yield* waitUntil('id')
    yield* chain(
        urlParamRef().opacity(1, duration * 0.5),
        codeRef().opacity(1, duration * 0.5)
    )
    yield* waitUntil('3')
    yield* urlParamRef().text("3", duration * .5)
    yield* codeRef().edit(duration * .5, false)`"SELECT * FROM recipes WHERE id = ${edit(`" + id`, `3"`)}`
    yield* waitUntil('Injection')
    yield* urlParamRef().text("3; DELETE FROM users;", duration * .5)
    yield* codeRef().edit(duration * .5, false)`"SELECT * FROM recipes WHERE id = 3${insert(`; DELETE FROM users;`)}"`
})
