import { Code, Img, Layout, lines, makeScene2D, Rect, Txt, word } from "@motion-canvas/2d";
import { colors } from "../../colors"
import { all, createRef, DEFAULT, sequence, waitFor, waitUntil } from "@motion-canvas/core";
import cursorSVG from '../../img/cursor.svg';
import { hideBottom, showBottom, symetricScale } from "../../functions/visibility.js";

export default makeScene2D(function* (view) {
  const codeRef = createRef<Code>()
  const panelRef = createRef<Rect>()
  view.fill(colors.bg)
  view.add(
    <Layout layout width="100%" height="100%">
      <Rect ref={panelRef} width="65%" height="100%" padding={50} alignItems="center">
        <Rect>
          <Code
            ref={codeRef}
            fontSize={45}
            code={`function Compteur() {
  const [count, increment] = useIncrement(0);

  return (
    <div>
      <p>Compteur : {count}</p>
      <button onClick={increment}>
        Incrementer
      </button>
    </div>
  );
}`} />
        </Rect>
      </Rect>
      <Rect fill={colors.bgLight} width="35%" height="100%"></Rect>
    </Layout>
  )

  yield* waitUntil('code')

  yield* all(
    codeRef().code.prepend(`import { renderToString } from 'react-dom/server'

`, 1),
    codeRef().code.append(`

renderToString(<Compteur />)`, 1),
    codeRef().selection(lines(15), 1)
  )

  yield* waitUntil('html')

  let baseLine = 5;
  yield* all(
    codeRef().code.replace(word(baseLine + 2, 20, 7), '0', 1),
    codeRef().code.remove(word(baseLine + 3, 13, 20), 1),
    codeRef().code.remove(lines(0, baseLine), 1),
    codeRef().code.remove(lines(baseLine + 7, baseLine + 20), 1),
    codeRef().selection(DEFAULT, 1),
  )

  yield* waitUntil('reset')

  baseLine = 1;
  yield* all(
    codeRef().code.prepend(`function Compteur() {
  const [count, increment] = useIncrement(0);

  return (
`, 1),
    codeRef().code.append(`  )
}`, 1),
    codeRef().code.replace(word(baseLine, 20, 1), '{count}', 1),
    codeRef().code.replace(word(baseLine + 1, 13, 0), ' onClick={increment}', 1),
  )

  yield* waitUntil('hydrate')

  yield* all(
    codeRef().code.prepend(`import { hydrateRoot } from 'react-dom/client'

`, 1),
    codeRef().code.append(`

hydrateRoot(
  document.getElementById("root"),
  <Compteur />
);`, 1),
    codeRef().selection(lines(15, 18), 1)
  )

  yield* waitUntil('bouton')

  yield* sequence(
    0,
    codeRef().opacity(0, 1),
  )
  codeRef().remove()
  const count = createRef<Txt>()
  const button = createRef<Rect>()
  const cursor = createRef<Img>()
  panelRef().add(
    <Rect layout direction="column" alignItems="center" justifyContent="start" width="100%">
      <Txt
        opacity={0}
        ref={count}
        padding={[16 * 2, 20 * 2]}
        fontFamily={'sans-serif'}
        text="Compteur : 0"
        fill={colors.textLight}
        fontSize={50}
      />
      <Rect
        layout
        opacity={0}
        ref={button}
        radius={10}
        fill="#ffbf00"
      >
        <Txt
          padding={[16 * 2, 20 * 2]}
          fontFamily={'sans-serif'}
          text="Incrémenter"
          fill="#000"
          fontSize={50}
        />
        <Img
          position={[80, 40]}
          rotation={-12}
          opacity={0} ref={cursor} src={cursorSVG} layout={false} width={150} />
      </Rect>
    </Rect>
  )

  yield* sequence(
    .3,
    showBottom(count(), 1),
    showBottom(button(), 1),
  )

  yield* waitUntil('click')

  yield* all(
    cursor().opacity(1, 1),
    cursor().rotation(-12, 1),
    cursor().position([70, 30], 1)
  )
  yield* sequence(
    .2,
    symetricScale(cursor(), 1, 0.8),
    all(
      count().text("Compteur : 1", .3),
      symetricScale(button(), 1, 0.9),
    )
  )
  yield* sequence(
    .2,
    symetricScale(cursor(), 1, 0.8),
    all(
      count().text("Compteur : 2", .3),
      symetricScale(button(), 1, 0.9),
    )
  )
  yield* cursor().opacity(0, 1)

  yield* waitUntil('RSC')

  yield* sequence(
    .3,
    hideBottom(button(), 1),
    hideBottom(count(), 1),
  )

  panelRef().children().forEach((child) => child.remove())

  panelRef().add(
    <Rect layout direction="column" width="100%" opacity={0}>
      <Txt
        opacity={1}
        text="page.tsx"
        fill={colors.textLight}
        fontSize={34}
        marginBottom={20}
      />
      <Code
        ref={codeRef}
        fontSize={40}
        code={`export default async function Page() {

  const res = await fetch(url)
  const posts = await res.json()

  return (
    <div>
      <h1>Blog</h1>
      <div>
        {posts.map((post) => (
          <article key={post.id}>
            <h4>{post.title}</h4>
            <Excerpt>{post.body}</Excerpt>
          </article>
        ))}
      </div>
      <ClientComponent />
    </div>
  );
}`}
      />
    </Rect>
  )
  yield* all(
    showBottom(panelRef().childAs<Rect>(0), 1)
  )

  yield* waitUntil('serialization')

  yield* all(
    codeRef().parent().childAs<Txt>(0).text('jsx', 1),
    codeRef().code(`<div>
  <h1>Blog</h1>
  <div>
    <article>
      <h4>Titre de mon premier article</h4>
      <p>Ceci est un article de test pour ...</p>
    </article>
    <article>
      <h4>Titre de mon second article</h4>
      <p>Dans cet article je vous propose...</p>
    </article>
    <article>
      <h4>Titre de mon troisième article</h4>
      <p>Lorsque j'ai découvert cette fonction...</p>
    </article>
  </div>
  <ClientComponent />
</div>`, 1)
  )

  yield* waitUntil('client_node')

  yield* codeRef().selection(lines(16), 1)

  yield* waitUntil('end_client_node')

  yield* codeRef().selection(DEFAULT, 1)

  yield* waitUntil('function_rsc')

  yield* all(
    codeRef().parent().childAs<Txt>(0).height(0, 1),
    codeRef().parent().childAs<Txt>(0).opacity(0, 1),
    codeRef().fontSize(38, 1),
    codeRef().code(`export function HomePageContent () {
  return (
    <div>
      <h1>Blog</h1>
      <div>
        <article>
          <h4>Titre de mon premier article</h4>
          <p>Ceci est un article de test pour ...</p>
        </article>
        <article>
          <h4>Titre de mon second article</h4>
          <p>Dans cet article je vous propose...</p>
        </article>
        <article>
          <h4>Titre de mon troisième article</h4>
          <p>Lorsque j'ai découvert cette fonction...</p>
        </article>
      </div>
      <ClientComponent />
    </div>
  );
}`, 1)
  )

  yield* waitFor(1)
})