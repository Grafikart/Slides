import {Code, lines, makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {colors} from "../../colors";
import {all, createRef, createSignal, waitUntil} from "@motion-canvas/core";
import {hideLeft, showRight} from "../../functions/visibility";
import {addBottomTitle} from "../../functions/text";

const d = .75

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const codeJSX = createRef<Code>()
  const code = createRef<Code>()
  const root = createRef<Rect>()
  const title = createSignal('React 18')
  view.add(<Rect>
    <Rect layout direction="column" gap={50} ref={root} width="75%" opacity={0}>
      <Rect fill={colors.bgLight} radius={20} layout padding={50}>
        <Code
          ref={codeJSX}
          fontSize={40}
          code={'<Button>Acheter</Button>'}
        />
      </Rect>
      <Rect layout direction="column" gap={20}>
        <Txt text={title} fill={colors.text}/>
        <Rect fill={colors.bgLight} radius={20} layout padding={50} direction="column" gap={20}>
          <Code
            ref={code}
            fontSize={40}
            code={`\
const Button = ({children, type = 'primary'}) => {
  const cls = \`btn btn-\${type}\`
  return <button class={cls}>
    {children}
  </button>
}`}
          />
        </Rect>
      </Rect>
    </Rect>
  </Rect>)

  yield *waitUntil('<button>')

  const bottomTitle = addBottomTitle(view, "Dépréciation de forwardRef()")
  yield* all(
    bottomTitle.show(d),
    showRight(root(), d),
  )

  yield *waitUntil('refProps')

  yield* all(
    codeJSX().code(`<Button ref={buttonRef}>Acheter</Button>`, d),
    code().selection([lines(0)], d),
  );

  yield *waitUntil('forwardRef')

  yield* all(
    code().code(`\
const Button = forwardRef(({children, type}, ref) => {
  const cls = \`btn btn-\${type}\`
  return <button class={cls} ref={ref}>
    {children}
  </button>
})`, d),
    code().selection([lines(0)], d),
  );

  yield *waitUntil('deprecatedForwardRef')

  yield* all(
    title('React 19', d * .5),
    code().code(`\
const Button = ({children, type, ref}) => {
  const cls = \`btn btn-\${type}\`
  return <button class={cls} ref={ref}>
    {children}
  </button>
})`, d),
  );

  yield *waitUntil('forwardRefEnd')

  yield * all(
    hideLeft(root(), d),
    bottomTitle.hide(d)
  )

})
