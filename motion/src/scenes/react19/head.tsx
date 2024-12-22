import {Code, lines, makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {colors} from "../../colors";
import {all, createRef, createSignal, waitUntil} from "@motion-canvas/core";
import {hideLeft, showRight} from "../../functions/visibility";
import {addBottomTitle} from "../../functions/text";

const d = .75

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const code = createRef<Code>()
  const root = createRef<Rect>()
  const title = createSignal('React 18')
  view.add(
    <Rect layout direction="column" gap={20} ref={root} opacity={0}>
      <Txt text={title} fill={colors.text}/>
      <Rect fill={colors.bgLight} radius={20} layout padding={50} direction="column" gap={20}>
        <Code
          ref={code}
          fontSize={40}
          code={`\
import {Helmet} from "react-helmet";

function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <Helmet>
        <title>{post.title}</title>
        <meta name="author" content="Jonathan" />
        <meta name="keywords" content={post.keywords} />
      </Helmet>
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}`}
        />
    </Rect>
  </Rect>)

  yield *waitUntil('head')


  const bottomTitle = addBottomTitle(view, 'Métadonnées')

  yield * all(showRight(root(), d), bottomTitle.show(d))

  yield *waitUntil('headHighlight')

  yield* all(
    code().selection([lines(6, 10), lines(0)], d)
  );

  yield *waitUntil('head19')


  yield *all(
    title('React 19', d / 2),
    code().selection([lines(4, 6)], d),
    code().code(`\
function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Jonathan" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}`, d)
  )

  yield *waitUntil('headEnd')

  yield * all(
    hideLeft(root(), d),
    bottomTitle.hide(d)
  )

})
