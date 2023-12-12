import {makeScene2D} from "@motion-canvas/2d/lib/scenes";
import {CodeBlock} from "@motion-canvas/2d/lib/components/CodeBlock";
import {createRef} from "@motion-canvas/core/lib/utils";
import {Layout, Node, Rect} from "@motion-canvas/2d";
import {fadeInFromTop, fadeOutToBottom} from "../../components/transition";
import {Card} from "../../components/Card";
import {all, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {Direction, slideTransition} from "@motion-canvas/core";

const fontSize = 80
const duration = 1

export default makeScene2D(function* (view) {

    view.fill('#161720')
    const rectRef = createRef<Rect>()

    yield* slideTransition(Direction.Right);

    yield view.add(<Rect></Rect>)

    yield view.add(
        <>
            <Rect opacity={0} ref={rectRef} layout gap={50} direction={'column'} alignItems="start"
                  justifyContent="center">
                <CodeBlock fontSize={fontSize} language="ts" code={`ERROR | INFO`}/>
                <Node>
                    <Card title="PHP">
                        <CodeBlock fontSize={fontSize * 0.6} language="php" code={`<?php
$flags = ["ERROR", "INFO"]`}/>
                    </Card>
                </Node>
                <Node>
                    <Card title="JS">
                        <CodeBlock fontSize={fontSize * 0.6} language="js" code={`const flags = ["ERROR", "INFO"]`}/>
                    </Card>
                </Node>
            </Rect>
            <Rect opacity={0} ref={rectRef} layout gap={50} direction={'column'} alignItems="start"
                  justifyContent="center">
                <CodeBlock fontSize={fontSize} language="ts" code={`flags & INFO`}/>
                <Node>
                    <Card title="PHP">
                        <CodeBlock fontSize={fontSize * 0.6} language="php" code={`<?php
in_array('INFO', $flags)`}/>
                    </Card>
                </Node>
                <Node>
                    <Card title="JS">
                        <CodeBlock fontSize={fontSize * 0.6} language="js" code={`flags.includes('INFO')`}/>
                    </Card>
                </Node>
            </Rect>
            <Rect opacity={0} ref={rectRef} layout gap={50} direction={'column'} alignItems="start"
                  justifyContent="center">
                <CodeBlock fontSize={fontSize} language="ts" code={`flags &= ~INFO`}/>
                <Node>
                    <Card title="PHP">
                        <CodeBlock fontSize={fontSize * 0.5} language="php" code={`<?php
$flags = array_filter($flags, fn($item) => $item !== 'INFO')`}/>
                    </Card>
                </Node>
                <Node>
                    <Card title="JS">
                        <CodeBlock fontSize={fontSize * 0.5} language="js" code={`flags = flags.filter((item) => item !== 'INFO'))`}/>
                    </Card>
                </Node>
            </Rect>
        </>
    )

    for (const index in view.children()) {
        const child = view.children()[index]
        const previous = view.children()[parseInt(index, 10) - 1]
        child.opacity(1)
        yield * all (
            previous ? fadeOutToBottom(previous as Layout, 1, 0) : undefined,
            sequence(0, waitFor(1), fadeInFromTop(child as Layout))
        )
        yield * waitFor(1)
    }

    yield * waitFor(10)

});
