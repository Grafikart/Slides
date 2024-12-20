import {makeScene2D, Rect} from "@motion-canvas/2d";
import {all, chain, easeOutExpo, waitUntil, createRef, sequence, waitFor} from "@motion-canvas/core";
import {colors} from "../../colors";
import {addBrowser} from "../../functions/browser";
import {times} from "../../functions/array";
import {gridify} from "../../functions/grid";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const rect = createRef<Rect>()
  view.add(<Rect ref={rect} zIndex={6}>
      {times(10).map(k => <Rect width={200} height={250} radius={10} fill="#2c2e3d" opacity={0}/>)}
    </Rect>)
  yield * rect().position([-400, -150], 0)
  const browser = addBrowser(view)
  yield * browser.position([0, -50], 0)

  yield * waitFor(1)

  // Animation au démarrage
  yield * browser.show(1)

  yield* waitUntil("grid");

  yield * all(
      gridify(rect(), {columns: 5, gap: 30, duration: .5, delay: .05}),
      sequence(.1, ...rect().children().map(c => c.opacity(1, .5)))
  )

  yield* waitUntil("mobile");

  yield * all(
    browser.mobile(),
    gridify(rect(), {duration: 1, delay: .05, columns: 1, gap: 30}),
    rect().position([0, -320], 1)
  )

  rect().save()

  yield* waitUntil("scroll");

  yield * chain(
    rect().position([0, -880], 1.5, easeOutExpo),
    rect().position([0, -1430], 1.5, easeOutExpo),
  )

  yield* waitUntil("flex");
  yield * all(
    rect().position([0, -300], 1 ),
    gridify(rect(), {duration: 1, delay: .05, columns: 10, gap: 30}),
  )


  yield waitFor(1)

  yield * chain(
    rect().position([-450, -300], 1.5, easeOutExpo),
    rect().position([-920, -300], 1.5, easeOutExpo),
  )

  yield* waitUntil("back");

  yield * all(
      gridify(rect(), {columns: 5, gap: 30, duration: 1, delay: 0}),
      browser.desktop(1),
      rect().position([-400, -150], .75)
  )

  // yield * rect().direction('row')
  // yield * browser.desktop()
})
