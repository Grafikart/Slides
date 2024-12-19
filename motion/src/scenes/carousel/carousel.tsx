import {makeScene2D, Rect} from "@motion-canvas/2d";
import {all, chain, easeOutExpo, waitUntil, createRef} from "@motion-canvas/core";
import {colors} from "../../colors";
import {addBrowser} from "../../functions/browser";
import {times} from "../../functions/array";
import {gridify} from "../../functions/grid";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const rect = createRef<Rect>()
  view.add(<Rect ref={rect} zIndex={6}>
      {times(10).map(k => <Rect width={200} height={250} radius={10} fill="#2c2e3d"/>)}
    </Rect>)
  yield * gridify(rect(), {columns: 5, gap: 30, duration: 0})
  yield * rect().position([-400, -150], 0)
  const browser = addBrowser(view)
  yield * browser.position([0, -50], 0)

  yield* waitUntil("mobile");

  yield * all(
    browser.mobile(),
    gridify(rect(), {duration: .5, delay: .02, columns: 1, gap: 30}),
    rect().position([0, -300], .5)
  )

  rect().save()

  yield* waitUntil("scroll");

  yield * chain(
    rect().position([0, -900], 1.5, easeOutExpo),
    rect().position([0, -1500], 1.5, easeOutExpo),
  )

  yield* waitUntil("flex");
  yield * all(
    rect().position([0, -300], .7 ),
    gridify(rect(), {duration: .7, delay: .02, columns: 10, gap: 30}),
  )

  yield * chain(
    rect().position([-450, -300], 1.5, easeOutExpo),
    rect().position([-920, -300], 1.5, easeOutExpo),
  )

  // yield * rect().direction('row')
  // yield * browser.desktop()
})
