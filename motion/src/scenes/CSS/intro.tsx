import { Code, LezerHighlighter, lines, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { colors } from "../../colors";
import {
  all,
  createRef,
  createSignal,
  delay,
  waitFor,
} from "@motion-canvas/core";
import { parser as CSSParser } from "@lezer/css";

Code.defaultHighlighter = new LezerHighlighter(CSSParser);

export default makeScene2D(function* (view) {
  view.fill(colors.bg);
  const codeRef = createRef<Code>();
  const underlineRef = createRef<Rect>();
  const labelRef = createRef<Txt>();
  const underlineWidth = createSignal(0);

  view.add(
    <Code
      ref={codeRef}
      code={`h1 {
  color: white;
  background: black;
}`}
    fontSize={100}
    />
  );

  const highlight = createSignal('h1')
  const selectorRange = createSignal(() => {
    const range = codeRef().findFirstRange(highlight());
    const bboxes = codeRef().getSelectionBBox(range);
    const first = bboxes[0];
    return first;
  });

  view.add(
    <Rect
      ref={underlineRef}
      offset={-1}
      position={() =>
        selectorRange().position.addY(selectorRange().size.y + 10)
      }
      size={() => [underlineWidth(), 6]}
      radius={3}
      fill={colors.yellow}
      opacity={0}
    />,
  );

  view.add(
    <Txt
      ref={labelRef}
      text={"Sélecteur"}
      fontSize={80}
      fill={colors.yellow}
      opacity={0}
      textAlign={"center"}
      position={() =>
        selectorRange().position
          .addY(selectorRange().size.y + 80)
          .addX(selectorRange().size.x / 2)
      }
    />,
  );

  yield* waitFor(1)
  yield* all(
    codeRef().selection(codeRef().findAllRanges(/h1/gi), 0.6),
    underlineRef().opacity(1, 0.6),
    delay(0.2, labelRef().opacity(1, 0.6)),
    underlineWidth(selectorRange().size.x, 0.6),
  );
    yield* waitFor(1)
    yield* all(
      codeRef().selection(codeRef().findAllRanges(/background/gi), 0.6),
      underlineRef().opacity(0, 0.6),
      labelRef().opacity(0, 0.6),
      underlineWidth(0, 0.6),
    );
    highlight("background")
    labelRef().text('Propriété')
    yield* all(
      underlineRef().opacity(1, 0.6),
      delay(0.2, labelRef().opacity(1, 0.6)),
      underlineWidth(selectorRange().size.x, 0.6),
    );
    yield* waitFor(1)
    yield* all(
      codeRef().selection(codeRef().findAllRanges(/black/gi), 0.6),
      underlineRef().opacity(0, 0.6),
      labelRef().opacity(0, 0.6),
      underlineWidth(0, 0.6),
    );
    labelRef().text('Valeur')
    highlight("black")
    yield* all(
      underlineRef().opacity(1, 0.6),
      delay(0.2, labelRef().opacity(1, 0.6)),
      underlineWidth(selectorRange().size.x, 0.6),
    );
});
