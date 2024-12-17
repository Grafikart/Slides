import { Img, Line, makeScene2D, Node, Rect, Txt } from "@motion-canvas/2d";
import { colors } from "../../colors.js";
import {
  all,
  chain,
  createRef,
  createRefArray,
  delay,
  easeOutBack,
  sequence,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import browserPNG from "../../../images/browser.png";
import fontSVG from "../../../images/font.svg";

const transitionSpeed = 1;

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const root = createRef<Node>();
  const browser = createRef<Img>();
  const fontIcon = createRef<Img>();
  const arrow = createRef<Line>();
  yield view.add(
    <Node ref={root}>
      <Img src={browserPNG} ref={browser} opacity={0} scale={0.5} />
      <Img src={fontSVG} ref={fontIcon} opacity={0} x={600} />
      <Line
        ref={arrow}
        lineWidth={4}
        stroke={colors.blue}
        arrowSize={20}
        points={[
          [-480, 0],
          [-180, 0],
        ]}
        x={300}
        endArrow
        start={0}
        end={0}
      />
    </Node>
  );
  yield* waitUntil("browser");
  yield* all(
    browser().opacity(1, transitionSpeed),
    browser().scale(1, transitionSpeed, easeOutBack)
  );
  yield* waitUntil("loadFont");
  yield* all(
    browser().x(-1200, transitionSpeed),
    fontIcon().x(0, transitionSpeed),
    fontIcon().opacity(1, transitionSpeed),
    arrow().end(1, transitionSpeed),
    arrow().x(0, transitionSpeed)
  );
  yield* waitUntil("loadFontMetrics");
  const metrics = createMetrics(root());
  yield* all(
    browser().x(-2400, transitionSpeed),
    fontIcon().x(-500, transitionSpeed),
    arrow().end(1, transitionSpeed),
    arrow().x(-500, transitionSpeed),
    metrics.show()
  );
  browser().remove();
  yield* waitUntil("loadUPM");
  const letter = createRef<Txt>();
  root().add(
    <Rect layout alignItems="start" y={100}>
      <Txt
        ref={letter}
        opacity={0}
        fontSize={700}
        fontFamily="Inter"
        text="A"
        fill={colors.text}
      />
      <Node y={-140}></Node>
    </Rect>
  );
  const upmArrow = createSizeArrow(
    letter().parent().childAs<Node>(1),
    "2048",
    colors.green,
    2048 * 0.4
  );
  yield* all(
    fontIcon().x(-1200, transitionSpeed),
    arrow().x(-1700, transitionSpeed),
    metrics.root().x(-700, transitionSpeed),
    upmArrow.show(),
    letter().opacity(1, transitionSpeed)
  );
  fontIcon().remove();
  arrow().remove();

  yield* waitUntil("resize");

  const lineHeight = createRef<Rect>();

  root().add(
    <Rect
      alignItems={"center"}
      justifyContent={"end"}
      ref={lineHeight}
      height={0}
      fill={colors.bgLight + "66"}
      width={800}
    ></Rect>
  );
  root().add(letter().parent());
  const lineHeightArrow = createSizeArrow(
    lineHeight(),
    "16px",
    colors.violet,
    500,
    500
  );
  yield* all(
    lineHeight().height(500, transitionSpeed),
    lineHeightArrow.show(),
    metrics.hide(),
    letter().fontSize(500, transitionSpeed),
    letter().parent().y(68, transitionSpeed),
    upmArrow.resize(500),
    letter().parent().childAs<Node>(1).y(-20, transitionSpeed)
  );

  // Position
  yield* waitUntil("browserPosition");
  yield* chain(
    upmArrow.hide(),
    letter().parent().y(70, transitionSpeed),
    letter().parent().y(-70, transitionSpeed),
    letter().parent().y(40, transitionSpeed)
  );
  yield* waitUntil("browserAscentDescent");
  const lines = createRef<Node>();
  root().add(<Node ref={lines}></Node>);
  const ascent = createLine(lines(), colors.blue, "Ascent", -260);
  const descent = createLine(lines(), colors.blue, "Descent", 340);
  yield* sequence(0.1, ascent.show(), descent.show());
  yield* waitUntil("browserCenter");
  yield* all(
    letter().parent().y(0, transitionSpeed),
    lines().y(-40, transitionSpeed)
  );
  yield* waitUntil("spaceUp");
  const ascentArrow = createSizeArrow(lines(), "", colors.blue, 50);
  ascentArrow.ref().arrowSize(10).lineWidth(4).y(-235);
  yield* all(ascentArrow.show());
  yield* waitUntil("spaceDown");
  const descentArrow = createSizeArrow(lines(), "", colors.blue, 50);
  descentArrow.ref().arrowSize(10).lineWidth(4).y(315);
  yield* all(descentArrow.show());
  yield* waitUntil("browserBaseline");
  const baseLine = createLine(lines(), colors.green, "Baseline", 220);
  const fontName = createRef<Txt>();
  root().add(
    <Txt
      ref={fontName}
      text={""}
      fontFamily={"Inter"}
      y={-300}
      width={1000}
      textAlign="center"
      fill={colors.text}
    />
  );
  yield* all(
    baseLine.show(),
    lineHeightArrow.hide(),
    ascentArrow.hide(),
    descentArrow.hide(),
    ascent.hide(),
    descent.hide(),
    letter().parent().x(20, transitionSpeed),
    delay(0.7, fontName().text("Inter", transitionSpeed))
  );
  letter().fontFamily("Comic Sans MS");
  yield* all(
    baseLine.ref().y(250, transitionSpeed),
    fontName().text("Comic Sans MS", transitionSpeed)
  );
  yield* waitFor(1);
  letter().fontFamily("Arial");
  yield* all(
    baseLine.ref().y(214, transitionSpeed),
    fontName().text("Arial", transitionSpeed)
  );
  yield* waitFor(1);
  letter().fontFamily("Tahoma");
  yield* all(
    baseLine.ref().y(240, transitionSpeed),
    fontName().text("Tahoma", transitionSpeed)
  );
  yield* waitUntil("capline");
  const capHeightArrow = createSizeArrow(root(), "13px", colors.green, 360);
  capHeightArrow.ref().y(20).x(220);
  yield* sequence(
    0.3,
    baseLine.hide(),
    lineHeightArrow.show(),
    capHeightArrow.show()
  );
  yield* waitFor(1);
  yield* sequence(
    0.3,
    fontName().text("", transitionSpeed),
    letter().opacity(0, transitionSpeed),
    lineHeightArrow.hide(),
    capHeightArrow.hide(),
    lineHeight().height(0, transitionSpeed)
  );
});

function createSizeArrow(
  parent: Node,
  label: string,
  color: string,
  height: number,
  left: number = 0
) {
  const ref = createRef<Line>();
  parent.add(
    <Line
      ref={ref}
      lineWidth={8}
      stroke={color}
      startArrow
      endArrow
      points={[
        [left, height / 2],
        [left, height * -0.5],
      ]}
      layout
      start={0.5}
      end={0.5}
      alignItems="center"
      paddingLeft={40}
    >
      <Node opacity={0} x={-20}>
        <Txt
          fontSize={40}
          fontFamily="Inter"
          text={label}
          fill={color}
          x={-100}
        />
      </Node>
    </Line>
  );
  return {
    show() {
      return all(
        ref().start(0, transitionSpeed),
        ref().end(1, transitionSpeed),
        ref().opacity(1, transitionSpeed),
        ref().childAs<Node>(0).opacity(1, transitionSpeed),
        ref().childAs<Node>(0).x(0, transitionSpeed)
      );
    },
    hide() {
      return all(
        ref().start(0.5, transitionSpeed),
        ref().end(0.5, transitionSpeed),
        ref().opacity(0, transitionSpeed),
        ref().childAs<Node>(0).opacity(0, transitionSpeed),
        ref().childAs<Node>(0).x(-20, transitionSpeed)
      );
    },
    ref,
    resize(height: number) {
      return all(
        ref().points(
          [
            [left, height / 2],
            [left, height * -0.5],
          ],
          transitionSpeed
        )
      );
    },
  };
}

function createMetrics(parent: Node) {
  const metrics = [
    { name: "unitsPerEm", value: 2048 },
    { name: "xHeight", value: 1118 },
    { name: "capHeight", value: 1490 },
    { name: "ascent", value: 1984 },
    { name: "descent", value: -494 },
  ];
  const refs = createRefArray<Rect>();
  const root = createRef<Rect>();

  parent.add(
    <Rect ref={root} layout direction="column" gap={20}>
      {metrics.map((metric) => (
        <Rect ref={refs}>
          <Node opacity={0} x={-50}>
            <Txt
              fontFamily="Inter"
              text={metric.name + ":"}
              fill={colors.blue}
              width={300}
            />
          </Node>
          <Node opacity={0} x={50}>
            <Txt
              fontFamily="Inter"
              text={metric.value.toString()}
              fill={colors.text}
              width={0}
              x={-100}
            />
          </Node>
        </Rect>
      ))}
    </Rect>
  );

  return {
    root: root,
    show: function () {
      return sequence(
        0.1,
        ...refs.map(function (r) {
          return all(
            r.childAs<Txt>(0).opacity(1, transitionSpeed),
            r.childAs<Txt>(0).x(0, transitionSpeed),
            delay(0.1, r.childAs<Txt>(1).opacity(1, transitionSpeed)),
            delay(0.1, r.childAs<Txt>(1).x(0, transitionSpeed))
          );
        })
      );
    },
    hide: function () {
      return sequence(0.1, root().opacity(0, transitionSpeed));
    },
  };
}

function createLine(parent: Node, color: string, label: string, y: number) {
  const line = createRef<Line>();
  const title = createRef<Txt>();
  const ref = createRef<Rect>();
  parent.add(
    <Rect
      ref={ref}
      layout
      alignItems="center"
      justifyContent="start"
      gap={20}
      y={y}
    >
      <Line
        ref={line}
        stroke={color}
        lineWidth={4}
        lineDash={[20, 20]}
        points={[
          [-300, 0],
          [400, 0],
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
    ref,
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
