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
const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );  
}`}
        />
    </Rect>
  </Rect>)

  yield * waitUntil('contextProvider')

  const bottomTitle = addBottomTitle(view, 'Context comme Provider')
  yield * all(
    showRight(root(), d),
    bottomTitle.show(d)
  )


  yield *waitUntil('contextcreate')

  yield * code().selection(lines(0), d)

  yield *waitUntil('contextprovider')

  yield * code().selection([lines(4), lines(6)], d)

  yield *all(
    title('React 19', d / 2),
    code().code(`\
const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );  
}`, d)
  )

  yield *waitUntil('contextEnd')

  yield * all(
    hideLeft(root(), d),
    bottomTitle.hide(d)
  )

})
