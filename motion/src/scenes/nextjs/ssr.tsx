import { Code, Img, Layout, makeScene2D, Node, Rect, Txt } from "@motion-canvas/2d";
import { addBrowser } from "../../components/browser.js";
import { all, capitalize, createRef, createSignal, delay, type PossibleVector2, type SignalValue, waitFor, waitUntil } from "@motion-canvas/core";
import nextLogo from './next-logo.svg';
import { colors } from "../../colors.js";
import { addCogs } from "../../components/cogs.js";
import reactLogo from './react.svg'

const File = ({ name, position, opacity }: { name: string, position: SignalValue<PossibleVector2>, opacity: number }) => {
    return <Layout gap={20} position={position} direction="column" layout alignItems="center" opacity={opacity}>
        <Rect stroke={colors.textLight}
            padding={20}
            lineWidth={2}>
            <Code
                lineWidth={4}
                stroke="#FF0000"
                fontFamily={'JetBrains Mono, monospace'}
                fontSize={24}
                code={`\
const ${capitalize(name.split('.')[0])} = () => {
  return <div>
    <p>{/* */}</p>
  </div>
}`}
            />
        </Rect>
        <Txt
            fontFamily={'JetBrains Mono, monospace'}
            text={name}
            fill={colors.text}
            fontSize={30}
        />
    </Layout>
}

export default makeScene2D(function* (view) {
    view.fill('#161720')
    const components = createRef<Node>()
    const html = createRef<Rect>()
    const nextLogoRef = createRef<Img>()

    const cogs = addCogs(view)

    view.add(<Node>
        <Node ref={components}>
            <File name="Page.tsx" position={[100, -300]} opacity={0} />
            <File name="Posts.tsx" position={[0, 0]} opacity={0} />
            <File name="Post.tsx" position={[-100, 300]} opacity={0} />
        </Node>
        <Rect
            layout
            width={1000}
            height={730}
            ref={html}
            opacity={0}
            scale={0.5}
            stroke={colors.textLight}
            padding={20}
            lineWidth={2}>
            <Code
                lineWidth={4}
                stroke="#FF0000"
                fontFamily={'JetBrains Mono, monospace'}
                fontSize={24}
                code={`\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<header>
        <h1>Bienvenue sur mon blog</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Articles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article class="post">
            <h2>Getting Started with TypeScript in 2025</h2>
            <div class="post-meta">
                <span class="date">May 5, 2025</span> | `}
            /></Rect>
        <Img ref={nextLogoRef} opacity={0} src={nextLogo} />
    </Node>)


    yield* waitUntil('start')

    yield* all(
        ...components().childrenAs<Layout>().map((c, k) => {
            return delay(0.2 * k, c.opacity(1, 1))
        }),
    )

    yield* waitUntil('next')

    yield* all(
        components().childAs<Layout>(0).position([-100, -300], 1),
        components().position([-600, 0], 1),
        nextLogoRef().opacity(1, 1)
    )

    yield* all(
        components().childAs<Layout>(0).position([-100, -300], 1),
        components().position([-600, 0], 1),
        nextLogoRef().opacity(1, 1)
    )

    yield* waitUntil('ssr')

    yield* cogs.play()

    yield* all(
        components().position([0, 0], 1),
        components().opacity(0, 1),
        ...components().childrenAs<Layout>().map(c => {
            return c.position([0, 0], 1)
        }),
    )

    yield* waitFor(.2)

    yield* cogs.hide()

    yield* all(
        nextLogoRef().position([-500, 0], 1),
        html().position([420, 0], 1),
        html().opacity(1, 1),
        html().scale(1, 1),
    )

    yield* waitUntil('browser')

    const browser = addBrowser(view, { width: 1000 })
    view.add(html())
    yield* browser.position([0, 0], 0)
    yield* all(
        browser.show(1),
        html().position([0, -50], 1),
        html().width(1000, 1),
        html().height(600, 1),
        html().stroke('#00000000', 1),
        nextLogoRef().opacity(0, 1)
    )

    yield* waitUntil('react_components')

    const positions = [
        [100, -300],
        [0, 0],
        [-100, 300]
    ] as [number, number][]

    yield* all(
        components().opacity(1, 1),
        browser.position([-400, 0], 1),
        html().position([-400, -50], 1),
        ...components().childrenAs<Layout>().map((c, k) => {
            return all(
                c.position([positions[k][0] + 600, positions[k][1]], 1),
            )
        }),
    )

    yield* waitUntil('react_render')

    const reactLogoRef = createRef<Img>()
    view.add(<Img
        position={[600, 0]}
        ref={reactLogoRef}
        width={400}
        height={400 * 150 / 169}
        src={reactLogo}
        opacity={0} />)

    const reactDOM = createRef<Rect>()

    view.add(
        <Rect
            layout
            width={1000}
            height={730}
            ref={reactDOM}
            opacity={0}
            scale={0.5}
            x={600}
            y={20}
            fill={colors.bg}
            stroke={colors.textLight}
            padding={20}
            lineWidth={2}>
            <Code
                lineWidth={4}
                stroke="#FF0000"
                fontFamily={'JetBrains Mono, monospace'}
                fontSize={24}
                code={`\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<header>
        <h1>Bienvenue sur mon blog</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Articles</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article class="post">
            <h2>Getting Started with TypeScript in 2025</h2>
            <div class="post-meta">
                <span class="date">May 5, 2025</span> | `}
            /></Rect>
    )


    yield* all(
        ...components().childrenAs<Layout>().map((c, k) => {
            return all(
                c.position([600, 0], 1),
                c.opacity(0, 1)
            )
        }),
        delay(
            .5,
            all(
                reactLogoRef().opacity(1, 1),
                reactDOM().opacity(1, 1),
                reactDOM().scale(1, 1),
            )
        )
    )

    yield* waitUntil('diff')

    yield* all(
        reactLogoRef().opacity(0, 1),
        browser.position([0, 0], 1),
        html().position([0, -50], 1),
        reactDOM().fill("#00000050", 1),
        reactDOM().position([0, 14], 1),
    )

    yield* all(
        reactDOM().opacity(0, 1)
    )

    yield* waitFor(1)
})