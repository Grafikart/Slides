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
function UserForm() {
  const onSubmit = async (e) => {
    e.preventDefault()
    //...
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" id="username" name="username" />
      <Button>Envoyer</Button>
    </form>
  );
}`} />
    </Rect>
  </Rect>)

  yield *waitUntil('onSubmit')

  const bottomTitle = addBottomTitle(view, 'Action')

  yield * all(
    showRight(root(), d),
    bottomTitle.show(d)
  )

  yield *waitUntil('onSubmitHighlight')

  yield* code().selection(lines(6), d)

  yield *waitUntil('action')

  yield * all(
    code().code(`\
function UserForm() {
  const onSubmit = async (e) => {
    e.preventDefault()
    //...
  };
  return (
    <form action={onSubmit}>
      <input type="text" id="username" name="username" />
      <Button>Envoyer</Button>
    </form>
  );
}`, d),
    title("React 19", d / 2)
  )

  yield *waitUntil('onsubmitargs')


  yield * all(
    code().code(`\
function UserForm() {
  const onSubmit = async (data: FormData) => {
    //...
  };
  return (
    <form action={onSubmit}>
      <input type="text" id="username" name="username" />
      <Button>Envoyer</Button>
    </form>
  );
}`, d),
    code().selection(lines(1,3), d)
  )

  yield *waitUntil('onsubmitend')

  yield * all(
    hideLeft(root(), d),
    bottomTitle.hide(d)
  )

})
