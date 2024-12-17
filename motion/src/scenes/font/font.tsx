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
  createRef,
  createRefMap,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { fadeOutToBottom } from "../../components/transition.js";

const transitionSpeed = 0.5;

export default makeScene2D(function* (view) {
  const layout = createRef<Rect>();
  const word = createRef<Txt>();
  const arrow = createRef<Line>();
  const scale = createSignal(0);
  const scalePx = createSignal(0);
  const labels = createRefMap<Txt>();

  view.fill(colors.bg);
  view.add(
    <>
      <Rect
        layout
        width="100%"
        ref={layout}
        alignItems="center"
        justifyContent="center"
      >
        <Txt
          ref={labels.word}
          opacity={0}
          fill={colors.text}
          lineHeight={300}
          fontSize={400}
          textAlign="center"
          fontFamily="Inter"
        />
        <Txt
          ref={labels.name}
          opacity={() => scale()}
          fill={colors.green}
          lineHeight={300}
          fontSize={40}
          textAlign="center"
          fontFamily="Inter"
          text={"UnitsPerEm"}
        />
        <Line
          layout
          justifyContent="center"
          alignItems="center"
          ref={arrow}
          points={[
            [0, 0],
            [0, 800],
          ]}
          stroke={colors.green}
          lineWidth={8}
          radius={40}
          startArrow
          endArrow
          start={() => 0.5 * (1 - scale())}
          end={() => (scale() + 1) * 0.5}
          opacity={() => scale()}
          paddingLeft={150}
        >
          <Txt
            ref={labels.upm}
            fill={colors.green}
            lineHeight={300}
            fontSize={40}
            textAlign="center"
            fontFamily="monospace"
            opacity={0}
          />
        </Line>
        <Layout alignItems="center" justifyContent="center" marginLeft={60}>
          <Txt
            ref={labels.preview}
            fill={colors.textLight}
            lineHeight={400}
            width={() => scalePx() * 10}
            fontSize={() => scalePx() * 10}
            fontFamily="Inter"
            textAlign="end"
            text="A"
            position={[0, 0]}
          />
        </Layout>
        <Line
          layout
          justifyContent="center"
          alignItems="center"
          points={() => [
            [0, 0],
            [0, scalePx() * 10],
          ]}
          stroke={colors.violet}
          lineWidth={8}
          arrowSize={20}
          radius={40}
          startArrow
          endArrow
          start={() => 0.5 * (1 - scalePx())}
          end={() => (scalePx() + 1) * 0.5}
          opacity={() => scalePx()}
          paddingLeft={150}
        >
          <Txt
            ref={labels.px}
            fill={colors.violet}
            lineHeight={300}
            fontSize={40}
            textAlign="center"
            fontFamily="monospace"
            text={() => (0 ? "" : Math.round(scalePx()) + "px")}
          />
        </Line>
      </Rect>
    </>
  );

  yield* waitUntil("UnitsPerEm");
  yield* all(scale(0, transitionSpeed).to(1, transitionSpeed * 2));
  yield* waitUntil("UPM 1000");
  yield* all(
    labels.upm().text("1000", transitionSpeed),
    labels.upm().opacity(1, transitionSpeed)
  );
  yield* waitUntil("16px");

  yield* all(scalePx(0, 0).to(16, transitionSpeed));
  yield* waitUntil("1000=16px");
  yield* all(
    arrow().points(
      [
        [0, 0],
        [0, 160],
      ],
      transitionSpeed
    )
  );
  yield* waitUntil("24px");
  yield* all(
    scalePx(24, transitionSpeed),
    arrow().points(
      [
        [0, 0],
        [0, 240],
      ],
      transitionSpeed
    )
  );
  yield* waitUntil("end-upm");
  yield* all(fadeOutToBottom(layout(), transitionSpeed, 0.1));
});
