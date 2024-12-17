import {
  Node,
  Path,
  Rect,
  Txt,
  makeScene2D,
  Line,
  Layout,
} from "@motion-canvas/2d";
import { colors } from "../../colors.js";
import {
  all,
  chain,
  createRef,
  createRefArray,
  createSignal,
  easeOutCubic,
  fadeTransition,
  sequence,
  slideTransition,
  waitUntil,
} from "@motion-canvas/core";
import { fadeInFromTop } from "../../components/transition.js";
import { changeTextWithFade } from "../../functions/text.js";

const transitionSpeed = 0.5;

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const root = createRef<Node>();
  const text = createRef<Txt>();
  yield view.add(
    <Node ref={root}>
      <Rect layout x={-600} width={0}>
        <Txt
          ref={text}
          position={[-150, 0]}
          text="abc"
          letterSpacing={0}
          opacity={0}
          fontFamily="Inter"
          textAlign="left"
          fontSize={400}
          fill={colors.text}
        />
      </Rect>
    </Node>
  );
  yield* waitUntil("glyph");
  yield* all(
    text().opacity(1, transitionSpeed),
    text().letterSpacing(200, 0.5, easeOutCubic)
  );
  yield* waitUntil("baseline");
  const baseLine = createLine(root(), colors.green, "baseline", 145);
  yield* baseLine.show();
  yield* waitUntil("xHeight");
  const xHeight = createLine(root(), colors.violet, "xHeight", -72);
  yield* all(xHeight.show(), changeTextWithFade(text(), "xoc"));
  yield* waitUntil("capHeight");
  const capHeight = createLine(root(), colors.purple, "capHeight", -146);
  yield* all(capHeight.show(), changeTextWithFade(text(), "Ton"));
  yield* waitUntil("capHeightnoupm");
  const arrow = createRef<Line>();
  const arrowLabel = createRef<Txt>();
  root().add(
    <Line
      layout
      alignItems="center"
      justifyContent="end"
      paddingRight={30}
      ref={arrow}
      stroke={colors.green}
      lineWidth={4}
      startArrow
      endArrow
      arrowSize={10}
      points={[
        [-700, 145],
        [-700, -200],
      ]}
      start={0}
      end={0}
    >
      <Txt
        ref={arrowLabel}
        opacity={0}
        text="UPM"
        fontSize={40}
        fill={colors.green}
        fontFamily="Inter"
      />
    </Line>
  );
  yield* all(
    arrowLabel().opacity(1, transitionSpeed),
    arrow().end(1, transitionSpeed)
  );
  yield* waitUntil("upm16");
  yield* all(arrowLabel().text("16px", transitionSpeed));
  yield* waitUntil("ascent");
  yield* all(
    arrowLabel().opacity(0, transitionSpeed),
    arrow().end(0, transitionSpeed)
  );
  const ascender = createLine(root(), colors.blue, "ascender", -270);
  const descender = createLine(root(), colors.blue, "descender", 260);
  yield* all(
    changeTextWithFade(text(), "Temps", 0),
    text().parent().x(-650, transitionSpeed),
    sequence(0.2, ascender.show(), descender.show())
  );
  yield* waitUntil("ascenteacute");
  yield* all(changeTextWithFade(text(), "Élan"));
  yield* waitUntil("queue");
  yield* all(changeTextWithFade(text(), "grelot"));
  yield* waitUntil("finmetrics");
  yield* sequence(
    0.1,
    ascender.hide(),
    descender.hide(),
    capHeight.hide(),
    xHeight.hide(),
    baseLine.hide(),
    root().childAs<Rect>(0).opacity(0, transitionSpeed)
  );
});

function createLine(parent: Node, color: string, label: string, y: number) {
  const line = createRef<Line>();
  const title = createRef<Txt>();
  parent.add(
    <Rect layout alignItems="center" justifyContent="start" gap={20} y={y}>
      <Line
        ref={line}
        stroke={color}
        lineWidth={4}
        lineDash={[20, 20]}
        points={[
          [-800, 0],
          [500, 0],
        ]}
        start={0}
        end={0}
      />
      <Rect width={0} x={-50}>
        <Txt
          fontSize={40}
          text={label}
          opacity={0}
          fill={color}
          ref={title}
          fontFamily="Inter"
        />
      </Rect>
    </Rect>
  );
  return {
    show: function* () {
      yield* sequence(
        0.1,
        line().end(1, transitionSpeed * 2),
        all(
          title().opacity(1, transitionSpeed),
          title().parent().x(0, transitionSpeed)
        )
      );
    },
    hide: function* () {
      yield* sequence(
        0.1,
        all(
          title().opacity(0, transitionSpeed),
          title().parent().x(-50, transitionSpeed)
        ),
        line().end(0, transitionSpeed * 2)
      );
    },
  };
}
