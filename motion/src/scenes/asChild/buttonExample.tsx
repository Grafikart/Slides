import { Layout, makeScene2D, Path, Rect, Txt, Img, Code, Length, Node } from "@motion-canvas/2d"
import { colors } from "../../colors"
import { all, createRef, createSignal, sequence, waitFor, waitUntil } from "@motion-canvas/core"


export default makeScene2D(function* (view) {
    view.fill(colors.bg)
    const ratio = createSignal(.5)
    const leftWidth = createSignal(() => ratio() * 100 + "%" as Length)
    const rightWidth = createSignal(() => (1 - ratio()) * 100 + "%" as Length)
    const codeRef = createRef<Code>()
    const leftPanel = createRef<Rect>()
    view.add(
        <>
            <Layout layout width="100%" height="100%">
                <Rect
                    ref={leftPanel}
                    layout
                    alignItems="center"
                    justifyContent="center"
                    width={leftWidth}
                    height="100%"
                >
                    <Code
                        ref={codeRef}
                        fontSize={40}
                        code={`<Button variant="primary">
    Je suis un bouton
</Button>`}
                    />
                </Rect>
                <Rect
                    fill={colors.bg}
                    width={rightWidth}
                    height="100%"
                />
            </Layout>
        </>
    )

    yield* waitUntil('as_a')

    yield* codeRef().code(`<Button variant="primary" as="a">
    Je suis un bouton
</Button>`, 1);

    yield* waitUntil('as_navlink')

    yield* codeRef().code(`<Button variant="primary" as={NavLink}>
    Je suis un bouton
</Button>`, 1);

    yield* waitUntil('as_navlink_href')

    yield* all(
        codeRef().code(`<Button variant="primary" as={NavLink} href="#">
    Je suis un bouton
</Button>`, 1),
        ratio(.6, 1)
    );

    yield* waitUntil('as_child')

    yield* all(
        codeRef().code(`<Button variant="primary" asChild>
    <a href="#">
        Je suis un bouton
    </a>
</Button>`, 1),
        ratio(.5, 1)
    );

    yield* waitFor(30)

})